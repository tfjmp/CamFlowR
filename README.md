# CamFlowR

Provenance visualiser for R using [cytoscape.js-prov](https://github.com/CamFlow/cytoscape.js-prov).

![RStudio Integration](https://raw.githubusercontent.com/CamFlow/CamFlowR/master/www/example.png)

## Installation

```
> devtools::install_github('tfjmp/RDataTracker', ref='development')
> devtools::install_github('CamFlow/CamFlowR')  
> library('CamFlow')  
> library('RDataTracker')
```

## Usage

CamFlow only:

```
> CamFlowVisualiser(myProvJSonString)
```
