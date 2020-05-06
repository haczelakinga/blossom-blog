/* eslint-disable no-empty */
'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-link-cloud').innerHTML),
  authorList: Handlebars.compile(document.querySelector('#template-author-list').innerHTML)
}

//title click handler
function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const attribute = clickedElement.getAttribute('href');
  const correctArticle = document.querySelector(`${attribute}`);

  correctArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors';

//Generate title links
function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // const linkHTML = `<li><a href="${articleId}"><span>${articleTitle}</span></a></li>`;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    html += linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

//Calculate params
let params = {
  min: 9999,
  max: 0,
};

function calculateTagsParams(allTags) {
  for(let tag in allTags) {
    params.max = allTags[tag] > params.max ? allTags[tag] : params.max;
    params.min = allTags[tag] < params.min ? allTags[tag] : params.min;
  }
  return params;
}

//Calculate font-size
function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}
//Generate tags
function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for( let article of articles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray) {
      const linkHtmlData = {tag: tag};
      const linkHtml = templates.articleTag(linkHtmlData);
      html += linkHtml;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    tagWrapper.innerHTML = html;
  }

  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);

  const allTagsData = {tags: []};

  for(let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }  
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

//tag click handler
function tagClickHandler(event, element){
  event.preventDefault();
  const clickedElement = element;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll(`[href="${href}"]`);

  for(let tagLink of tagLinks ) {
    tagLink.classList.add('active');
  }

  generateTitleLinks(`[data-tags~="${tag}"]`);
}

function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  for(let tagLink of tagLinks) {
    tagLink.addEventListener('click', function(){
      let element = this;
      tagClickHandler(event, element);
    });
  }
}

addClickListenersToTags();

// Generate Post Author
function generateAuthors(){
  const allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  const authorListWrapper = document.querySelector(optAuthorsListSelector);

  for(let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');

    const linkHtmlData = {articleAuthor: articleAuthor};
    const linkHtml = templates.articleAuthor(linkHtmlData);

    if(!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    html += linkHtml;
    authorWrapper.innerHTML = html;
  }

  //Generate list of authors
  let allAuthorsData = {authors: []};

  for(let author in allAuthors) {
    allAuthorsData.authors.push({
      name: author,
      count: allAuthors[author]
    });
  } 

  console.log(allAuthorsData);

  authorListWrapper.innerHTML = templates.authorList(allAuthorsData);
}
generateAuthors();

// Author Click handler
function authorClickHandler(event, element){
  event.preventDefault;
  const clickedElement = element;
  const href = clickedElement.getAttribute('href');
  console.log(clickedElement);
  const author = href.replace('#author-', '');

  generateTitleLinks(`[data-author="${author}"]`);
}

// Author Click Listener
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for(let authorLink of authorLinks) {
    authorLink.addEventListener('click', function(){
      let element = this;
      authorClickHandler(event, element);
      console.log(element);
    });
  }
}
addClickListenersToAuthors();


