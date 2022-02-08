const dummy = blogs => {
  blogs = 1;
  return blogs;
};

const totalLikes = blogs => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  let mostLikes = 0;
  blogs.reduce((a, b) => {
    mostLikes = Math.max(a, b.likes);
    return mostLikes;
  }, 0);

  let blogWithMostLike = blogs.filter(i => i.likes === mostLikes);

  blogWithMostLike = blogWithMostLike[0];

  const returnedObj = {
    title: blogWithMostLike.title,
    author: blogWithMostLike.author,
    likes: blogWithMostLike.likes,
  };

  return returnedObj;
};

const mostBlogs = blogs => {
  const getAllAuthorsNames = blogs.map(authors => {
    const allAuthors = authors.author;
    return allAuthors;
  });

  let removeDuplicatedName = [...new Set(getAllAuthorsNames)];

  let authorName = '';
  let countingBlogs = [];

  for (let i = 0; i < removeDuplicatedName.length; i++) {
    authorName = removeDuplicatedName[i];
    let subcounter = 0;

    for (let j = 0; j < getAllAuthorsNames.length; j++) {
      if (removeDuplicatedName[i] === getAllAuthorsNames[j]) {
        subcounter++;
      }
    }

    countingBlogs.push([authorName, subcounter]);
  }

  const returnedObj = {
    author: '',
    blogs: 0,
  };
  subcounter = 0;
  for (let i = 0; i < countingBlogs.length; i++) {
    if (countingBlogs[i][1] > subcounter) {
      subcounter = countingBlogs[i][1];
      returnedObj.author = countingBlogs[i][0];
      returnedObj.blogs = countingBlogs[i][1];
    }
  }

  return returnedObj;
};

const mostLikes = blogs => {
  const newObject = blogs.reduce(
    ({ findAuthor, largestAmountOfLikes }, { likes, author }) => {
      findAuthor[author] = likes = (findAuthor[author] || 0) + likes;
      if (likes > largestAmountOfLikes.likes) {
        largestAmountOfLikes = { author, likes };
      }

      return { findAuthor, largestAmountOfLikes };
    },
    { findAuthor: {}, largestAmountOfLikes: { likes: 0 } }
  ).largestAmountOfLikes;

  return newObject;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
