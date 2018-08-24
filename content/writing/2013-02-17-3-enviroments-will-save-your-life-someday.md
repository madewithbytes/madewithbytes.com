---
layout: base
title: The 3 environments that will save your life someday.
date: 2013-02-17T00:00:00-00:00
description: Web applications can be complex and error prone (due the complexity). Using a three different environments such as Development, Staging and Production with meaningful tests will help to polish your application into a better product before it is released.
summary: Web applications can be complex and error prone (due the complexity). Using a three different environments such as Development, Staging and Production with meaningful tests will help to polish your application into a better product before it is released.
author: Alfredo Aguirre
published: true
---
<p>
  <img src="/images/posts/penguins.jpg" title="Three lonely strays find a lost brother after a blizzard [Australasian Antarctic Expedition, 1911-1914] by By National Library of Australia Commons" alt="Three penguins find a forth one." /><br>
  Photo credit: <a href="http://www.flickr.com/photos/national_library_of_australia_commons/6173951726/">National Library of Australia Commons</a> on Flickr
</p>


<p class="highlight">
  <strong>
    TL;DR. Make sure you have meaningful tests and different environments for the development, staging and production build. These will help you improve any fairly complex application systematically into a better product without breaking your team workflow.
  </strong>
</p>

<p>
  Web applications can be convoluted and prone to error. I am sure you care about your product and want it to be the best possible. Well, while there is not a single way to guarantee this, you can put in place safeguard measures that would help you to mitigate risks and achieve better results.
</p>

<p>
  The process for deploying your application to the production environment should be gradual, so that everyone involved in the build can have the opportunity to do their bit and refine the product.
</p>

<p>
  Now, I am assuming that your project is fairly complex, you have a few people in your team and your enviroments replicate production. I also acknowledge that not all applications are the same and pet projects may not require much test coverage or the introduction of unnecessary processes overhead.
</p>

<p>
  The idea is that the application should hit production only after going through the development and staging environments. These should be used to find and fix any imperfection of your build, this is a technique I came across while collaborating with the clever guys at Mozilla.
</p>

<p>
  Because it can take a bit longer to land a feature in production, targeting three environments <a href="http://michaellant.com/2010/07/23/calculating-the-velocity-of-your-agile-projects/">can introduce friction to the velocity of your team</a>, but this is when automation comes in handy. The more you automate the deployments the less friction you will have and the more productive you will be. Tools like <a href="http://docs.fabfile.org/en/1.5/">fabric</a> can help you to achieve this.
</p>


<h2>Prelude</h2>

<p>
  At the base of solid software there are tests that back up the functionality of the application. I can't stress enough how important they are, otherwise <a href="http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd">how can you prove that it will work?</a> Valid metrics don't leave any room for doubts.
</p>

<p>
  Also, please run your test before pushing the code to the repository, as waiting for the continous integration server to notify you and your colleagues that you broke the build will induce this kind of feeling...
</p>

<p>
  <img src="/images/posts/you-broke-the-build.png" title="Breaking the build will induce this kind of feeling to your colleaguess. Don't do it. DON'T BREAK THE BUILD!!!11 . By the way cats can't spell." alt="Colleagues won't enjoy you broke the build." /><br>
  Photo credit: <a href="http://www.grumpycats.com">grumpycats.com</a>
</p>

<h2 id="development-environment"><a href="#development-environment">Development environment</a></h2>

<p>
  Or the developers playground.
</p>

<p>
  The development environment is meant to be bootstraped to deploy automatically from the head of your development branch. Breakages on this enviroment can be acceptable, although make sure you are not pushing code in a broken state. Commit often, but only push your feature once it is ready to be deployed.
</p>

<p>
  This environment is important because once your feature is completed it allows you to see how it performs in <a href="https://twitter.com/oising/status/298464920717099009">an environment that is not your development machine</a>.
</p>

<p>
  Even if you are replicating your production enviroment with <a href="http://www.vagrantup.com/">vagrant</a>, it is still useful to have a URL that everyone can look at.
</p>

<h2 id="stage-environment"><a href="#stage-environment">Stage environment</a></h2>

<p>
  Or the release candidate.
</p>

<p>
  Stage is the home of your release candidate, any code form the development environment that you are happy with should be deployed here. The build should NOT be broken at anytime on this environment.
</p>

<p>
  Now, this environment is being reviewed by QA and maybe your client, if you are building this application for someone else, this is why it's important that it is available all the time.
</p>

<p>
  The deployment to this enviroment is manual.
</p>

<p>
  You are encouraged to find bugs here, so you can eliminate them before they make it into production. If a bug is found the bugfix should start back from the test for you to be able to verify that it has been resolved, then development and back to staging again.
</p>

<h2 id="production-environment"><a href="#production-environment">Production environment</a></h2>

<p>
  Or the ultimate goal.
</p>

<p>
  This is it. This is where all the hard work that everyone has put in is reflected. It's where that awesome thing that you built and you want to tell everyone about lives.
</p>

<p>
  Once you get your enviroments up and running, optimise the deployments between them and deploy often. Make it easy to iterate on your project, also automate and then automate some more, this will keep your sanity if a crisis should happen.
</p>

<p>
  I suggest you don't skip any of the environments, they are designed to improve your application and reduce any bugs while not disturbing the workflow of the rest of the team. e.g. QA won't be affected if you deploy something that breaks the build.
</p>

<p>
  Even though I just said not to skip the flow of the enviroments, sometimes common sense is more important. Remember that <a href="http://www.python.org/dev/peps/pep-0020/">practicality beats purity.</a>
</p>

<p>
  And that's it. This is the flow I generally use for my applications, but if you use some other technique, or have some comments I would love to hear them.
</p>
