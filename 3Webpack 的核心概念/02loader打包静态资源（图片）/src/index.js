import avatar from './avatar.jpg';
import card from './card.jpg'

var img = new Image();
img.src = avatar;

var root = document.getElementById('root');
root.append(img);


var img2 = new Image();
img2.src = card;
root.append(img2);
