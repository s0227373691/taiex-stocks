import './LayoutArea.css'


const LayoutAreaLeft = ({ children }) => <div className='LayoutArea-left'>{children}</div>
const LayoutAreaRight = ({ children }) => <div className='LayoutArea-right'>{children}</div>

const LayoutArea = {}
LayoutArea.Left = LayoutAreaLeft;
LayoutArea.Right = LayoutAreaRight;

export default LayoutArea