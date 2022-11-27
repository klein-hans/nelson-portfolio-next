import { forwardRef } from 'react';
import Ripples from 'react-ripples';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Button = forwardRef(
  (
    {
      color,
      variant,
      size,
      circular,
      iconOnly,
      children,
      type,
      className,
      href,
      filename,
      onClick,
      ...rest
    },
    ref
  ) => {
    const animation =
      'hover:box-shadow: 0 0.5em 0.5em -0.4em var(--hover) focus:transform: translateY(-0.25em) focus:box-shadow: 0 0.5em 0.5em -0.4em var(--hover) focus:transform: translateY(-0.25em)';

    switch (color) {
      case 'white':
        color = 'bg-gray-50 focus:bg-gray-100';
        break;
      case 'primary':
        color =
          'bg-primary-600 focus:bg-opacity-90 focus:outline-0 hover:bg-primary-400 hover:text-black';
        break;
      case 'secondary':
        color = 'bg-teal-500';
        break;
      case 'info':
        color = 'bg-sky-500';
        break;
      case 'success':
        color = 'bg-teal-500';
        break;
      case 'warning':
        color = 'bg-amber-500';
        break;
      case 'error':
        color = 'bg-red-500';
        break;
      case 'light':
        color = 'bg-gray-100';
        break;
      case 'dark':
        color = 'bg-gray-900';
        break;
      default:
        color = 'bg-primary-500';
        break;
    }

    const stackedClassName = `${color} ${variant} ${circular && 'rounded-lg'} 
      ${iconOnly} py-2 px-4 text-white w-full text-center text-base font-semibold ${className} hover:no-underline
      `;

    return (
      <div className='flex justify-center'>
        <Ripples className=' w-52'>
          {type === 'download' ? (
            <a
              target='_blank'
              href={href}
              {...rest}
              ref={ref}
              className={stackedClassName}
              onClick={onClick}
            >
              {children}
            </a>
          ) : type === 'link' ? (
            <Link
              href={href}
              onClick={onClick}
              className={`${stackedClassName} shadow-3xl`}
            >
              {children}
            </Link>
          ) : (
            <button
              {...rest}
              type={type}
              ref={ref}
              className={stackedClassName}
              onClick={onClick}
            >
              {children}
            </button>
          )}
        </Ripples>
      </div>
    );
  }
);

// Setting default values for the props of MDButton
Button.defaultProps = {
  size: 'medium',
  variant: 'contained',
  color: 'white',
  circular: false,
  iconOnly: false,
};

// Typechecking props for the MDButton
Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['text', 'contained', 'outlined', 'gradient']),
  color: PropTypes.oneOf([
    'white',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
