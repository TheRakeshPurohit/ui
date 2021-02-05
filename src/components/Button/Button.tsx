import React, { forwardRef, useRef, useImperativeHandle } from 'react'
// @ts-ignore
import cssStyles from './Button.module.css'
// @ts-ignore
import { IconContext } from '../Icon/IconContext'
import { IconLoader } from '../Icon/icons/IconLoader'

interface Props {
  block?: boolean
  className?: any
  children?: React.ReactNode
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  loading?: boolean
  shadow?: boolean
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'
  style?: React.CSSProperties
  type?:
    | 'primary'
    | 'default'
    | 'secondary'
    | 'outline'
    | 'dashed'
    | 'link'
    | 'text'
  danger?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  ref?: any
  ariaSelected?: boolean
  ariaControls?: string
  tabIndex?: 0 | -1
  role?: string
}

interface RefHandle {
  container: () => HTMLElement
  button: () => HTMLButtonElement
}

const Button = forwardRef<RefHandle, Props>(
  (
    {
      block,
      className,
      children,
      danger,
      disabled = false,
      onClick,
      icon,
      iconRight,
      loading = false,
      shadow = true,
      size = 'tiny',
      style,
      type = 'primary',
      htmlType,
      ariaSelected,
      ariaControls,
      tabIndex,
      role,
    }: Props,
    ref
  ) => {
    const containerRef = useRef()
    const buttonRef = useRef()
    const showIcon = loading || icon

    useImperativeHandle(ref, () => ({
      get container() {
        return containerRef.current
      },
      get button() {
        return buttonRef.current
      },
    }))

    let classes = [cssStyles['sbui-btn']]
    let containerClasses = [cssStyles['sbui-btn-container']]

    classes.push(cssStyles[`sbui-btn-${type}`])

    if (block) {
      containerClasses.push(cssStyles['sbui-btn--w-full'])
      classes.push(cssStyles['sbui-btn--w-full'])
    }

    if (danger) {
      classes.push(cssStyles['sbui-btn--danger'])
    }

    if (shadow) {
      classes.push(cssStyles['sbui-btn-container--shadow'])
    }

    if (size) {
      classes.push(cssStyles[`sbui-btn--${size}`])
    }

    if (className) {
      classes.push(className)
    }

    return (
      <span ref={containerRef} className={containerClasses.join(' ')}>
        <button
          ref={buttonRef}
          className={classes.join(' ')}
          disabled={loading || (disabled && true)}
          onClick={onClick}
          style={style}
          type={htmlType}
          aria-selected={ariaSelected}
          aria-controls={ariaControls}
          tabIndex={tabIndex}
          role={role}
        >
          {showIcon &&
            (loading ? (
              <IconLoader
                size={size}
                className={cssStyles['sbui-btn--anim--spin']}
              />
            ) : icon ? (
              <IconContext.Provider value={{ contextSize: size }}>
                {icon}
              </IconContext.Provider>
            ) : null)}
          {children && <span>{children}</span>}
          {iconRight && !loading && (
            <IconContext.Provider value={{ contextSize: size }}>
              {iconRight}
            </IconContext.Provider>
          )}
        </button>
      </span>
    )
  }
)

export default Button
