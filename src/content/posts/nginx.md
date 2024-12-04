---
title: How to disable XXX for XXX that comes with Vesta Panel
tags: [nginx,web]
date: August 16 2023
featuredImage: https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

I had a server which has both IPv4 and IPv6 and they were working perfectly fine. I had installed Vesta CP which is an amazing control panel application and it was working just great. But there was only one problem with Exim4. It was not sending emails properly to Gmail. Mails sent to gmail were bounced. I checked the log and the message was

message does not meet IPv6 sending guidelines regarding PTR records

Ok, that is pretty straight forward. The server’s IPv6 didn’t have a reverse DNS or PTR. To fix this problem I had to set it up. But then I was thinking how to tell Exim not touse IPv6 but IPv4. The problem begins

Exim in this server came with Vesta Panel, and in most forums people suggested to add a new entry as `disable_ipv6=true in the /etc/exim4/update-exim4.conf.con` file. I’ve added that and restarted exmi4, but there were no changes. Netstat shows that exim is still listening on port 25 against the IPv6 address.

```shell
netstat -tulpn | grep :25
tcp 0 0 0.0.0.0:25 0.0.0.0:* LISTEN 7013/exim4
tcp 0 0 0.0.0.0:2525 0.0.0.0:* LISTEN 7013/exim4
tcp6 0 0 :::25 :::* LISTEN 7013/exim4
tcp6 0 0 :::2525 :::* LISTEN 7013/exim4
```

Some people in different forum suggested that dc_local_interfaces should be set to 127.0.0.1 but it still didn’t make any change in exim.

Finally, finally, I noticed that there is a configuration template file `/etc/exim4/exim4.conf.template`. Curiously, I’ve added disable_ipv6=true directive over there, restarted exim and voila! It started working 🙂

```js
netstat -tulpn | grep :25
tcp 0 0 0.0.0.0:25 0.0.0.0:* LISTEN 8110/exim4
tcp 0 0 0.0.0.0:2525 0.0.0.0:* LISTEN 8110/exim4
```

I hope you will find this article useful, and save some time when you run into similar problem with exim and vesta panel.