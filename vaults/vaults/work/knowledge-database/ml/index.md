---
id: knowledge-database--machine-learning-index
aliases:
  - ml
  - ai
  - data science
tags: []
---

[Back To Index](/knowledge-database/index.md)

# Machine Learning

<!--toc:start-->
- [Machine Learning](#machine-learning)
  - [BERTopic](#bertopic)
  - [Resources](#resources)
  - [Articles](#articles)
<!--toc:end-->

## BERTopic
TODO:
  - [ ] gather all videos from Maarten and classify them
  - [ ] gather articles about topic modeling in general 

**Overview**:
**What**: Based on BERT, it clusters documents in a dense formation with easily interpretable topis since it keeps
important words in description. It has a modular approach consisting of:
1. Embeddings | numerical representation of words
 - if a two words are similar to each other (based on the data that the embedding model(right word?) was trained on)
   they will (we assume) have vectors close to each other which can be used for proximity
3. Dimension Reduction
4. Clustering
5. Bag-of-Words
6. Topic Representation
7. (optional) Topic diversity

Contains a lot of visualization methods in order to better validate the model. 
- The 'topics per class' method, could it be used to generate classes based on subreddits and see what they talk about? 
  Might be a way to get a broad view of the topics for a 'programming' community.

## Resources
- [Python for Data Analysis](https://wesmckinney.com/book/python-builtin.html)
- [Google Trends Datastore](https://googletrends.github.io/data/)
- [Intro To Boosted Trees](https://xgboost.readthedocs.io/en/stable/tutorials/model.html)
- [Madewithml](https://madewithml.com/courses/mlops/labeling/) | collection of resources about various ml topics
- [Bulk labelling using `bulk` & `prodigy`](https://www.youtube.com/watch?v=gDk7_f3ovIk)
- [Aweasome NLP](https://github.com/keon/awesome-nlp)

## Articles
  - [1] [Text classification](https://stackabuse.com/text-classification-with-python-and-scikit-learn/?fbclid=IwAR1UuOTO0-C-qWTnEHFBpTemkXav_LAQh7j_y5Z6DQ3ORSGujTdtihB2B5Q) | Text classification w random forest
    - Solid walk through of text classification w random forest
  - [2] [Building Blocks: Text Pre-Processing](https://towardsdatascience.com/building-blocks-text-pre-processing-641cae8ba3bf) | Pre-procesing text for NLP
    - Great reasoning about how and _why_ we do pre-processing along with what order to do the steps in
  - [3] [How to Use Bertopic for Topic Modeling and Content Analysis?](https://www.holisticseo.digital/python-seo/topic-modeling/) 
    - end-to-end walk through of using bertopic
    - shows how it can be used for seo - shows how to use the model to see what topic cluster a word is associated to
  - [4] [Topic modelling with BERT](https://towardsdatascience.com/topic-modeling-with-bert-779f7db187e6)
    - Originally article from the man himself
  - [5] [Keyword extration with BERT](https://towardsdatascience.com/keyword-extraction-with-bert-724efca412ea)
    - Originally article from the man himself

