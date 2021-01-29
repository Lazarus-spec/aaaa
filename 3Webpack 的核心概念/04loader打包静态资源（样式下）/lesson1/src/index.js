import avatar from './avatar.jpg';
import styles from  './index.scss';
import createAvatar from './createAvatar'

createAvatar();

var img = new Image();
img.src = avatar;
img.classList.add(styles.avatar);

var root = document.getElementById('root');
root.append(img);

