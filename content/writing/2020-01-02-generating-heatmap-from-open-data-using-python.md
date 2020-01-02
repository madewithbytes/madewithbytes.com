---
title: Generating a heatmap from open data using Python
date: 2020-01-02T00:00:00-00:00
slug: generating-a-heatmap-from-open-data-using-python
description: Generating a heatmap from open data using Python
summary: With the vast amount of open data available this write up will provide you with some idea of how to go on about generating a heatmap from shape files.
image: /images/posts/nasa-unsplash.jpg
author: Alfredo Aguirre
published: true
---
<p>
    Say you have a bunch of <a href="#open-data">geographic open data available</a>
    and you want to make it easier to interpret or you like
    long walks on the beach, tasty food and pretty graphics like me.
</p>

<p>
    In this episode we'll use a <a href="https://datos.gob.mx/busca/dataset/mapas-del-medio-ambiente-de-mexico-emapas/resource/13cbac65-8318-42cb-b37a-78443f028a2c">native language speakers from Mexico</a>
    dataset. So make sure your <a href="https://www.fieggen.com/shoelace/knots.htm">shoelaces are well tied</a> and join me in this quest to make
    some sweet graphics happen.
</p>

<p>
    Also in case you are pressed for time or reading pseudo-code might is more your thing.
    You can totally skip all this and go head straight to the
    <a href="https://github.com/madewithbytes/mappa">Github repo</a>,
    it should contain everything you need to make own adventure <strong>(NO REFUNDS)</strong>.
</p>

<p>OK are they gone? Cool, here we go.</p>

<h2>The Crew</h2>
<p><i>* Intro music plays *</i></p>
<p>Let me introduce you the crew for this quest while the intro music plays:</p>
<ul>
  <li><a href="https://matplotlib.org/">Matplotlib</a> <i>as the graph generator</i></li>
  <li><a href="https://seaborn.pydata.org/">Seaborn</a> <i>as the matplotlib sidekick to make it look pretty</i></li>
  <li><a href="https://pandas.pydata.org/">Pandas</a> <i>as the data analyst</i></li>
  <li><a href="https://pypi.org/project/pyshp/">Pyshp</a> <i>as the translator that speaks the language of the shape files</i></li>
  <li><a>You</a> <i>as the hacker that will make the graphics happen.</i></li>
</p>

<p>
  Once you downloaded and unpacked the zip file make sure to place it at `data/` at the
  root of the repository. It should look something like this:
</p>

{{< highlight bash >}}
$ tree data/PHLITL_2000
data/PHLITL_2000
├── PHLITL_2000.dbf
├── PHLITL_2000.lyr
├── PHLITL_2000.prj
├── PHLITL_2000.shp
└── PHLITL_2000.shx
{{< /highlight >}}

<p>
    From these files the entry point for for our code is the shape file
    `data/PHLITL_2000/PHLITL_2000.shp`. Lets sneak peek the file.
</p>

<h2>Introspecting the shape file</h2>

<p>
  For this part of the quest we'll ask pyshp do its thing. Yo buddy it's your turn!
</p>
<p>
  <strong>
    IMPORTANT: Make sure the
    <a href="https://github.com/madewithbytes/mappa/blob/master/requirements.txt">requirements of the repo</a>
    are installed and the data has been extracted in the expected location: `data/` (NO REFUNDS).
  </strong>
</p>

<script src="https://gist.github.com/alfredo/b4b24edc5996d574d945f8ad82ff9a6b.js"></script>

<p>
Running this snippet will produce results similar to:
</p>

{{< highlight bash >}}
$ python 01_read_file.py
Columns available: `['AREA', 'PERIMETER', 'DPHLIL_', 'DPHLIL_ID', 'EDO_NUM', 'EDO_LEY', 'MPO_NUM', 'MPO_LEY', 'PHLI_TOT', 'PHLI_TML1', 'PHLI_TML2', 'PHLI_TML3', 'PHLI_TML4', 'ICON_TML1', 'ICON_TML2', 'ICON_TML3', 'ICON_TML4', 'DPHLIL_NUM', 'DPHLIL_LEY']`
Total records: 2480
Municipality: Mexicali
State: Baja California
Total native speakers: De 15,000 y mas
Shape points (sample): `[(788992.7599999954, 3707437.079667801), (788883.5799999968, 3707243.719667798), (788863.5499999961, 3707013.139667798)]`
{{< /highlight >}}

<p>
    We are in luck. This is very opportune for our purposes.
    The shp file contains all the data we need to generate the shapes and also contains
    the values to generate the heatmap. YEET! yeet indeed.
</p>

<p>Alright crew, time to move to the next step.</p>


<h2>Transform and filter the data</h2>

<p>
  It would be cool if there was a tool that easily would allow us to query and modify the data in the shape file you say.
</p>

<p>
  Fam, say no more. Time for pandas to take the wheel.
</p>

<p>
  <strong>
    IMPORTANT: Make sure the
    <a href="https://github.com/madewithbytes/mappa/blob/master/requirements.txt">requirements of the repo</a>
    are installed and the data has been extracted in the expected location: `data/` (NO REFUNDS).
  </strong>
</p>

<script src="https://gist.github.com/alfredo/909f1dc74a41c8eb1b89399f33b1b670.js"></script>

<p>Running this script will generate an output similar to:</p>

{{< highlight bash >}}
# python 02_analize_shape_data.py
Available states: {'Hidalgo', 'Aguascalientes', 'Baja California Sur', 'Nuevo Leon', 'Tamaulipas', 'Nayarit', 'Tlaxcala', 'Baja California', 'San Luis Potosi', 'Mexico', 'Colima', 'Coahuila', 'Queretaro', 'Guanajuato', 'Tabasco', 'Chiapas', 'Morelos', 'Sinaloa', 'Oaxaca', 'Quintana Roo', 'Zacatecas', 'Campeche', 'Puebla', 'Sonora', 'Chihuahua', 'Guerrero', 'Yucatan', 'Michoacan', 'Durango', 'Distrito Federal', 'Veracruz', 'Jalisco'}
Available values: {'Sin poblacion hablante de lengua indigena', 'De 2,500 a 4,999 y de 5,000 a 14,999', 'Menor de 2,500 y de 2,500 a 4,999', 'De 5,000 a 14,999', 'De 15,000 y mas', 'Menor de 2,500', 'De 2,500 a 4,999', 'Menor de 2,500 y de 5,000 a 14,999', 'De 5,000 a 14,999 y de 15,000 y mas'}
{{< /highlight >}}

<p>
    This show the states contained in the data frame and the possible values for each municipality.
</p>

<p>
    Looking at the values extracted it seems that some of them are a superset of the others.
    Why is that you ask? Your guess is as good as mine.
</p>
<ul>
  <li>No population of native language speakers</li>
  <li>Less than 2,500</li>
  <li>Less than 2,500 and from 2,500 to 4,999</li>
  <li>Less than 2,500 and from 5,000 to 14,999</li>
  <li>From 2,500 to 4,999</li>
  <li>From 2,500 to 4,999 and from 5,000 to 14,999</li>
  <li>From 5,000 to 14,999 and 15,000 and more</li>
  <li>From 5,000 to 14,999</li>
  <li>15,000 and more</li>
</ul>

<p>
    I know what you are thinking, but <strong>where are my graphs?</strong> I came here
    for the graphs. I hear you, we were grewing to a crescendo.
</p>

<h2>Filtering and displaying the data per state</h2>

<p>
  As we saw during the data introspection there are 2480 municipalities contained in
  this dataset. Rendering all of them at once might be a hindrance to process the information
  which is why we decided to put it into a graphic in the first place.
</p>

<p>
  A good splitting point for this dataset is a state which contains several
  municipalities. So let's get the crew do that. We'll use the analised data
  to generate a values configuration for the colours of the heatmap.
</p>

<p>
  Since some of the data is a superset of others instead of assuming whether
  intensity of the heatmap corresponded to the lower or higher band a different palette
  was used to indicate this discrepancy. <i>In the face of ambiguity, refuse the temptation to guess.</i>
</p>

<p>
  Let's use Oaxaca as the example to generate our first heatmap.
</p>

<p>
  <strong>
    IMPORTANT: Make sure the
    <a href="https://github.com/madewithbytes/mappa/blob/master/requirements.txt">requirements of the repo</a>
    are installed and the data has been extracted in the expected location: `data/` (NO REFUNDS).
  </strong>
</p>


<script src="https://gist.github.com/alfredo/b79cbce9f1d873fc9033ed5a9c6b3f28.js"></script>

<p>
    Running this snippet `python 03_render_municipalities_per_state.py` will generate
    an output similar to:
</p>

<img src="/images/posts/oaxaca-full-map.png" alt="Oaxaca state heatmap." />

<p>
    Cool, but still is not quite there yet.
</p>

<p>
    Rendering all the municipalities adds a bit of noise to the map and doesn't quite
    show the story we want to tell. The number of native speakers per municipality in
    Oaxaca state. Let's fix that.
</p>

<h2>Zoom in. Enhance.</h2>

<p>
  The best way I can think of to focus the viewer attention is to zoom in to the Oaxaca
  state. As luck would have it there is a gist for that.
</p>

<p>
  <strong>
    IMPORTANT: Make sure the
    <a href="https://github.com/madewithbytes/mappa/blob/master/requirements.txt">requirements of the repo</a>
    are installed and the data has been extracted in the expected location: `data/` (NO REFUNDS).
  </strong>
</p>

<script src="https://gist.github.com/alfredo/061586e78517bc4c7842413c2ef282ba.js"></script>

<p>
    Running this snippet `python 03_render_municipalities_per_state.py` will generate
    an output similar to:
</p>

<img src="/images/posts/oaxaca-zoomed-map.png" alt="Zoomed Oaxaca heatmap" />


<p>
  And there you have it, a zoomed in version of the estate showing the Oaxaca state.
</p>

<p>
    This is a bit better but there are a few things missing, such as the heatmap legends,
    description of the heatmap, etc. Unfortunately the time for this episode has flown by
    so we'll need to improve on this code another time.
</p>

<p>
  This is a broadstrokes what is needed to generate a heatmap. A more complete code
  example is available in the <a href="https://github.com/madewithbytes/mappa">Github repo</a>.
  Where the author took more creative liberties, hopefully the pseudocode is readable and
  won't consume too many cognitive units.
</p>

<p>
    In case you are curious to see what the other heatmap look for the other states the repo has a
    cache of all the generated states in the <a href="https://github.com/madewithbytes/mappa/tree/master/heatmaps">heatmap directory</a>.
</p>

<p>Phew, this is it for now. I hope you had as much fun as I did.</p>

<h2>FAQ</h2>
<p>Q: Wait what? Is this it?</p>

<p style="font-size: 2em;padding: 0 3em;"><i>"Maybe the real treasure was the friends we made along the way"</i></p>

<h5>Footnotes</h5>
<p id="open-data">
1. Open data sites in reverse alphabetical order <a href="https://data.gov.uk/">United Kingdom</a> and <a href="https://datos.gob.mx/">Mexico</a>
<p>
