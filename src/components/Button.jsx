import { motion } from "framer-motion";

/** Touch-friendly button / link with hover + tap motion. */
export default function Button({
  href,
  onClick,
  variant = "primary",
  icon: Icon,
  children,
  external = false,
  download,
  ...rest
}) {
  const className = `btn btn-${variant}`;
  const motionProps = { whileHover: { y: -2, scale: 1.02 }, whileTap: { scale: 0.97 } };
  const content = (
    <>
      {Icon && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        className={className}
        href={href}
        download={download}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...motionProps}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" className={className} onClick={onClick} {...motionProps} {...rest}>
      {content}
    </motion.button>
  );
}
