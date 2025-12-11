
/**
 * @description Props for ButtonGroup component
 * @interface Props
 * @property {React.ReactNode} children - children to render
 * @property {string} layout - current layout
 * @property {string} toLayout - layout to change to
 * @property {string} position - position of button group
 * @property {Function} setLayout - function to set layout
 */
type Props = {
  children: React.ReactNode;
  layout: 'grid' | 'list';
  toLayout: 'grid' | 'list';
  position: 'left' | 'middle' | 'right';
  setLayout: React.Dispatch<React.SetStateAction<"grid" | "list">>;
}

/**
 * @description - Component for button group
 * @param {Props} props - props for component
 */
const ButtonGroup = ({ children, layout, toLayout, position, setLayout }: Props) => {
  const isActive = layout === toLayout;
  return (
    <button
      disabled={isActive}
      className={`${isActive ? 'bg-brand-primary/20 border-brand-primary' : 'bg-transparent border-gray-600 hover:bg-gray-700'} 
      border p-2.5 transition-all duration-300 ease-in-out
      ${position === 'left' ? 'rounded-l-lg border-r-0' : position === 'middle' ? 'border-r-0' : 'rounded-r-lg'}
      disabled:cursor-not-allowed`}
      onClick={() => {
        localStorage.setItem('layout', toLayout);
        setLayout(toLayout);
      }}
    >
      {children}
    </button>
  )
}

export default ButtonGroup;
