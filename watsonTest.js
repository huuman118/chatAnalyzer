var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
if (process.env.NODE_ENV !== 'production') require('./secrets')

var toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  iam_apikey: process.env.IBM_KEY
})
