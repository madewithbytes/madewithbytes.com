---
layout: base
title: The deployment black box, Mercurio
date: 2013-02-19T00:00:00-00:00
slug: mercurio-the-deployment-black-box
description: Mercurio is a set of components designed to deploy or run a test suite a message to the host and perform an action with the push of a button in a black box, while encouraging good development practices.
summary: Mercurio is a set of components designed to transmit a message to the host and perform an action with the push of a button in a black box, while encouraging good development practices.a
image: /images/posts/mercurio-explained.jpg
author: Alfredo Aguirre
published: true
---

<p class="quote">
  Write tests, deploy often and iterate quickly.
</p>

<p>
  Automation is the best, because once a task has been automated the machine won't forget to run any of the steps required, and that will give me more time to tackle other challenges instead. Deployments are one of my favourite things to automate because when done well it facilitates quick iterations on the application.
</p>

<p>
  For a while I have been thinking about creating a deployment box, the kind of box that you push a button and then the computer works its magic, and then your site is up and running. Finally I managed to set aside some time to work on this project and learn a bit more about <a href="http://www.arduino.cc/">arduino</a> during the process.
</p>

<h2 id="introducing-mercurio"><a href="#introducing-mercurio">Introducing Mercurio</a></h2>

<p>
  <a class="image-detail" href="/images/posts/mercurio-large.png"><img src="/images/posts/mercurio-explained.jpg" alt="Image of the mercurio black box" title="Mecurio the deployment black box."/></a>
</p>

<p>
  <a href="https://github.com/alfredo/mercurio">Mercurio</a> is a set of components designed to transmit a message to a host and perform an arbitrary action with the push of a button from a black box while encouraging good development practices.
</p>

<p>
  I use the box to trigger my deployments and run my test suite but with the schematics and the code released it should be easy to adapt it to do whatever you want. Deploying a man on the Moon?  Maybe not.
</p>

<p>
  Mercurio has two main components:
</p>

<p>
  The hardware, which consists of <a href="#hardware">a black box</a> containing every bit necessary for the analog interaction (the red button).
</p>

<p>
  And the software: <a href="#software">a python listener</a> which will translate the button push into a concrete action on the host.
</p>

<p>
  Because mercurio is decoupled from any specific tool it can easily be adapted to play well with whatever workflow you have. By the way, if you aren't using any tool for automating repetitive tasks I suggest you <a href="https://github.com/fabric/fabric">start looking into it</a>. Trust me once you start automating you won't be able go back to do things manually and the more you do it the better you get at it.
</p>


<h2 id="targets"><a href="#targets">Targets</a></h2>

<p>
  Mercurio uses a knob to switch between targets and the selected target is shown in the LCD screen. The targets available are:
</p>

<ul class="itemized">
  <li>Test</li>
  <li>Staging</li>
  <li>Production</li>
</ul>

<p>
  These targets match <a href="/writting/3-enviroments-will-save-your-life-someday/">the environments I use in my projects</a> but they can be easily tweaked.
</p>

<p>
  <img src="/images/posts/mercurio-lcd-detail-small.jpg" alt="" />
</p>

<p>
  <em>Test</em> is used for running the test suite.
</p>

<p>
  <em>Staging and Production</em> are used to deploy to the selected enviroment.
</p>

<p>
  You'll notice that the Development environment is missing and that is because it should be already deploying the application continuously without any human intervention.
</p>

<h2 id="hardware"><a href="#hardware">Hardware: The black box</a></h2>

<p>
  The black box has been designed to allow the selection of a target and to let the listener know when the button has been pressed.
</p>

<p>
  <img src="/images/posts/mercurio-inside-small.jpg" alt="Internal look of the mercurio black box" title="Internal look of the black box, the arduino and breadboard are fixed with velcro to the top of the box."/>
</p>

<p>
  Building your own <em>black box</em> shouldn't be too complicated; even if you are starting with arduino development. The components used for replicating this box are:
</p>

<ul class="itemized">
  <li>An arduino duemilanove or superior.</li>
  <li>A breadboard.</li>
  <li>Several jumper cables.</li>
  <li>An USB Cable A-B.</li>
  <li>A LCD display (16 x 2).</li>
  <li>Two 10k Ohm potentiometers.</li>
  <li>One 10K Ohm resistor.</li>
  <li>An analog microswitch with a fancy button.</li>
  <li>A durable box for hold all the bits together.</li>
</ul>

<p>
  And the schematics I created for joining these bits together are:
</p>

<p>
  <a class="image-detail" href="https://github.com/alfredo/mercurio/blob/master/mercurio.png"><img src="/images/posts/mercurio-schematics-small.png" alt="Schematics for the mercurio black box" title="These are the schematics used for creating the black box."/></a>
<br>
Image developed using <a href="http://fritzing.org/">Fritzing</a>.
</p>

<p>
  Think of this diagram as legos. There are three components made with the previous bits: The LCD screen and its contrast knob, an analog microswitch and an analog knob, and they are glued and coordinated by the arduino.
</p>

<p>
  The arduino sketch for the hardware and more detail about the black box can be found in <a href="https://github.com/alfredo/mercurio"> mercurio's github repository</a>
</p>


<h2 id="software"><a href="#software">Software: The listener</a></h2>

<p>
  This is a single python process running which listens on a serial port then executes the specified command for any given target via <em>subprocess.call</em>. The listener is configured via a <a href="#config">mercurio.cfg file.</a>
</p>


<img src="/images/posts/mercurio-listener.jpg" alt="screen shot" title="Before you say something, I intentionally took this picture instead of the screnshot. I know how to do those, thank you very much." />

<p>
  More detail about the listener and its installation can be found in <a href="https://github.com/alfredo/mercurio_listener">the mercurio listener github repository</a>
</p>


<h2 id="config"><a href="#config">Configuration: mercurio.cfg file</a></h2>

<p>
  Once the black box is assembled and the listener installed, mercurio is ready to be run. But we need to configure it, this is done on a per project basis because there is the possibility that you use different tools for different projects.
</p>

<p>
  A <em>mercurio.cfg</em> file is used to configure the runner. This file must be placed where you intend to run the command to start the listener. It consists of two sections <em>general</em> and <em>targets</em>.
</p>

<p>
  Under the <em>general</em> section the <em>port</em> must be specified. This will be used by the listener to hear from the black box. I opted for the port to be specified instead of trying to guess where it is connected.
</p>

<p>
  The port where the box has been connected can be determined by running the following command; this will show you the list of serial ports available.
</p>

{{< highlight bash >}}
# python -m serial.tools.list_ports
{{< /highlight >}}

<p>
  Under the <em>targets</em> sections the list of targets should be declared. They must match the targets available in the black box, by default: <em>test, staging and production.</em>
</p>

<p>
  The command specified after the target will be executed when the black box says so. At the moment the command functionality is a limited but if you use a tool like <a href="https://github.com/fabric/fabric">fabric</a> you should be fine.
</p>

<p>
  This is a sample configuration I use to test and deploy on one of my projects.
</p>

{{< highlight ini >}}
[general]
# Port where the black box has been connected
# Use python -m serial.tools.list_ports`` to determine it.
port: /dev/tty.usbserial-A900cfep

[targets]
# Command to be run when this destination is targeted.
test : fab test
staging: fab staging deploy
production: fab production deploy:confirmation=False
{{< /highlight >}}

<p>
  And that's it, all that needs to be done now is plug the black box to the computer and run the mercurio listener:
</p>

{{< highlight bash >}}
# mercurio-run.py
{{< /highlight >}}

<p>
  It will give you some feedback and tell you that the box and the listener are talking to each other and you are ready to deploy, test and have fun (if you are into pressing buttons or automation, whatever floats your boat dude. I am not judging you).
</p>


<h2 id="instructions"><a href="#instructions">Mercurio instructions</a></h2>

<p>
  Now this is the tricky bit, the instructions on how to use it.
</p>

<p>1. Select a target with the knob.</p>
<p>2. Push the red button.</p>
<p>3. Enjoy seeing mercurio seeing do its thing.</p>
<p>4. Iterate</p>


<h2 id="conclusion"><a href="#conclusion">Conclusion</a></h2>

<p>
  Automation is great, it will make your life easier especially while executing mission critical operations because once a task has been automated and you know that it works, it will give you peace when you need to perform this task (even during a crisis).
</p>

<p>
  Automation can also reduce the friction between you writing the code and it being deployed in production. If you make it easy and fun to iterate this cycle you'll find yourself doing more and more iterations and this will be translated into a better product.
</p>

<p>
  Arduino was a great help to create mercurio seeing it take analog readings and turning them digital is so much fun.
</p>

<p>
  The box and the listener can be improved in lots of different ways and I would love to hear your ideas on how to do it.
</p>

<p>
  If you have any questions or you would like me to explain further any of the bits I mentioned in this write up <a href="#contact">let me know</a> and I would be happy to do it.
</p>

<p>
  Discussion in <a href="http://news.ycombinator.com/item?id=5243789">Hacker News</a>.
</p>

<h2 id="faq"><a href="#faq">Frequently Asked Questions</a></h2>

<p>
  <em>Q: Has it been completely demagnetised?</em>  <br>
  A: I'll give my answer in a video form.<br>
  <div class="youtube">
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/iDbyYGrswtg" frameborder="0" allowfullscreen></iframe>
  </div>
</p>


<p>
  <em>Q: What is the license on the components?</em><br>
  A: Both components have been released under the <a href="http://en.wikipedia.org/wiki/MIT_License">MIT license</a>, modify them, use them and create something really cool.
</p>

<p>
  <em>Q: Why did you choose that name?</em><br>
  A: Mercurio is spanish for <a href="http://en.wikipedia.org/wiki/Mercury_(mythology)">Mercury</a> and he was good at delivering messages.
</p>
