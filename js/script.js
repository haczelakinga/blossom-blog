'use strict';

//Title Click
function titleClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  const activeArticles = document.querySelectorAll('article.active');
  let attribute = clickedElement.getAttribute('href');
  let correctArticle = document.querySelector(`#${attribute}`);

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  correctArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

//Generate Title List
function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let articles = document.querySelectorAll(optArticleSelector + customSelector);
  const links = document.querySelectorAll('.titles a');
  let html = '';

  for (let article of articles) {
    let articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = `<li><a href="${articleId}"><span>${articleTitle}</span></a></li>`;
    html += linkHTML;
  }

  titleList.innerHTML = html;

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

//Generate Tags
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

//Tah Click Handler
function tagClickHandler(event, element){
  event.preventDefault();

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  const tagLinks = document.querySelectorAll(`[href="${href}"]`);
  let clickedElement = element;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');

  for(let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  for(let tagLink of tagLinks ) {
    tagLink.classList.add('active');
  }

  generateTitleLinks(`[data-tags~="${tag}"]`);
}

// Tag click listener
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
    console.log(articleAuthor);
    const linkHtml = `<a href=#author-${articleAuthor}>${articleAuthor}</a>`;
    console.log(linkHtml);

    html += linkHtml;

    authorWrapper.innerHTML = html;
  }
}
generateAuthors();

// Author Click handler
function authorClickHandler(event, element){
  event.preventDefault;

  let clickedElement = element;
  console.log(clickedElement);
  const href = clickedElement.getAttribute('href');
  console.log(href);
  const author = href.replace('#author-', '');
  console.log(author);

  generateTitleLinks(`[data-author~="${author}"]`);
}

// Author Click Listener
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for(let authorLink of authorLinks) {
    authorLink.addEventListener('click', function(){
      authorClickHandler(event, element);
      let element = this;
    });
  }
}
addClickListenersToAuthors();