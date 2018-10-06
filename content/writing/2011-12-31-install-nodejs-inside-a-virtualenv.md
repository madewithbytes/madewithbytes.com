---
layout: base
title: Install node.js and coffescript inside a python virtualenv
date: 2011-12-31T00:00:00-00:00
description: The importance of being a lazy developer
summary: If you want to use coffee-script or node.js into a project using python virtual environments without having to fiddle with your entire system, here is a quick guide on how to do it.
image: /images/posts/java-script.png
author: Alfredo Aguirre
published: true
---
<p>
  <img title="java script by jenny-pics" src="/images/posts/java-script.png" alt="java-script.png" />
</p>

<p>If you want to use <a href="http://jashkenas.github.com/coffee-script/">coffee-script</a> or <a href="http://nodejs.org/">node.js</a> into a project using python virtual environments without having to fiddle with your entire system, here is a quick guide on how to do it.</p>

<p>Usually when developing I like to keep my projects self-contained, keep all dependencies in the same enviroment, this is where <a href="http://pypi.python.org/pypi/virtualenv/">virtualenv</a> and <a href="http://pypi.python.org/pypi/virtualenvwrapper/">virtualenv_wrapper</a> come in handy.</p>


<p>1. Activate the virtualenv:</p>
{{< highlight bash >}}
$ workon test
{{< /highlight >}}

<p>2. Move inside the virtualenv directory:</p>

{{< highlight bash >}}
(test)$ cdvirtualenv
{{< /highlight >}}

<p>3. Export the directory as the prefix for the installation:</p>

{{< highlight bash >}}
(test)$ export PREFIX=`pwd`
{{< /highlight >}}


<p>4. Get the latest version of <a href="http://nodejs.org/">node.js</a> from <a href="http://nodejs.org/">http://nodejs.org/</a> and unpack it e.g.</p>

{{< highlight bash >}}
(test)$ wget http://nodejs.org/dist/v0.6.6/node-v0.6.6.tar.gz
(test)$ tar xvfz node-v0.6.6.tar.gz
{{< /highlight >}}

<p>5. Once inside the unpacked node directory:</p>

{{< highlight bash >}}
(test)$ ./configure --prefix=$PREFIX
(test)$ make
(test)$ make install
{{< /highlight >}}

<p>6. Check that node.js was installed correctly:</p>

{{< highlight bash >}}
(test)$ which node
{{< /highlight >}}

<p>7. Fortunately npm (node package manager) is installed with node.js as well, now we can proceed with the installation of coffee-script:
</p>

{{< highlight bash >}}
(test)$ npm install -g coffee-script
{{< /highlight >}}

<p>npm uses the PREFIX environment variable to determine where to install the node packages, bear this in mind in case you plan to install any other packages.</p>

<p>8. Check that coffe-script was installed successfully:</p>

{{< highlight bash >}}
(test)$ which coffee
{{< /highlight >}}

<p>9. Play with node.js or coffee-script :)</p>

<p>If you found this useful or there is something not quite right <a class="external twitter sticker" href="http://twitter.com/a_alfredo">let me know!</a></p>

<p>Photo credit: <a href="http://www.flickr.com/photos/jenny-pics/4520503357/">jenny-pics on flickr</a></p>
