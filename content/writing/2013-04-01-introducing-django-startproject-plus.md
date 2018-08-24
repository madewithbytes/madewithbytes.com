---
layout: base
title: Introducing Django startproject plus.
date: 2013-04-01T00:00:00-00:00
slug: introducing-django-startproject-plus
description: The template functionality on Django's startproject command is great, but a template system without support for more context variables is not very helpful with more complex setups..
summary: The template functionality on Django's startproject command is great, but a template system without support for more context variables is not very helpful with more complex setups.
author: Alfredo Aguirre
published: true
---

<p>
  The custom template functionality on Django's startproject command is great, but unfortunately it <a href="https://docs.djangoproject.com/en/1.5/ref/django-admin/#startproject-projectname-destination">doesn't support passing extra variables to the context</a>. This is not very helpful with more complex template setups.
</p>

<p>
  So I created a <a href="https://github.com/alfredo/django-startproject-plus">wrapper around Django's startproject command</a>. It supersets the command by adding support for passing extra context to the template.
</p>

<p>
  Because this command is a drop-in replacement it can be invoked with the same flags that startproject supports.
</p>

<p>
  This issue has been brought up to the <a href="https://code.djangoproject.com/ticket/18277">django-devs mailing list</a>. But it has ended up as a documentation amend unless there is more demand for this.
</p>

<p>
  Since I have a need for this I decided to create this simple script, which I bundled as a package to make it easier to use.
</p>

<p>
  The source code is available on github: <a href="https://github.com/alfredo/django-startproject-plus">https://github.com/alfredo/django-startproject-plus</a>. Please do report any issues you find with it.
</p>


<h2>Installation</h2>

<p>This package requires Django 1.5.x installed and it is available in pypi:</p>

{{< highlight bash >}}
# pip install django-startproject-plus
{{< /highlight >}}


<h2>Usage</h2>

<p>This is a drop in replacement for the django-admin.py startup, with an extra_context flag:</p>


{{< highlight bash >}}
# django-startproject.py myproject --extra_context='{"some": "json"}'
{{< /highlight >}}


<h2>Things to do:</h2>

<p>Support django-admin.py startapp.</p>

