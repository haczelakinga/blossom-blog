/* eslint-disable no-empty */
'use strict';

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
  const correctArticle = document.querySelector(`#${attribute}`);

  correctArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = `<li><a href="${articleId}"><span>${articleTitle}</span></a></li>`;

    html += linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  const articles = document.querySelectorAll(optArticleSelector);

  for( let article of articles) {

    const tagWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray) {
      const linkHtml = `<li><a href=#tag-${tag}>${tag}</a></li>`;
      html += linkHtml;
    }

    tagWrapper.innerHTML = html;
  }
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

  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    const linkHtml = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;

    html += linkHtml;
    authorWrapper.innerHTML = html;
  }
}
generateAuthors();

// Author Click handler
function authorClickHandler(event, element){
  event.preventDefault;
  const clickedElement = element;
  const href = clickedElement.getAttribute('href');
  console.log(href);
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


