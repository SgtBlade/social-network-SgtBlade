import {observable, action, decorate, configure} from 'mobx';
import isUrl from 'is-url'
import {Comment} from './comment';
import User from './user';

configure({enforceActions: 'observed'});

class BookPost {

  constructor({title, release, isbn, owned = false, bookData = false, originalPoster, comments = [], image = ''}) {

    if(isUrl(image)) this.image = image
    else this.image = false

    this.bookData = bookData;
    this.title = title;
    this.release = new Date(release);
    this.isbn = isbn;
    this.owned = owned;
    this.comments = comments;
    this.originalPoster = originalPoster;
  }

  setOwned() {
    this.owned ? this.owned = false : this.owned = true;
  }

  seedComments() {
    const user = new User({name: 'MiguelDP', id: 1});
    this.comments.push(new Comment({ user: user, content: 'Ah mah gawd I luv dis book' }));
    this.comments.push(new Comment({ user: user, content: 'Cannot wait for this book to get released' }));
    this.comments.push(new Comment({ user: user, content: 'Oooh a new book' }));
    this.comments.push(new Comment({ user: user, content: 'Cool book' }));
  }

  addComment(userData, comment) {
    if (comment.length >= 4)this.comments.push(new Comment({ user: userData, content: comment }))
  }

  setBookData(data) {
    this.bookData = data;
  }

  changeImage(img) {
    this.image = img;
  }

  changeRelease(release) {
    this.release = new Date(release);
  }
}

decorate(BookPost, {
  owned: observable,
  setOwned: action,

  release: observable,
  changeRelease: action,

  image: observable,
  changeImage: action,

  comments: observable,
  addComment: action,

  bookData: observable
});

export default BookPost;