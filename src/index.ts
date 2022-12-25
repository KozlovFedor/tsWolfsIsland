import styles from './index.module.scss';

const container = document.getElementById('root')!;
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.className = styles.Canvas;
container.appendChild(canvas);