import Link from "next/link";
import ButtonGroup from "./ui-elements/ButtonGroup";
import Label from "./ui-elements/Label";

type Props = {
  hidden: string,
}

/**
 * 
 * @returns 
 */
const Footer = ({ hidden }: Props) => {

  /**
   * @description - navigation component
   * @param {string} text
   * @param {string} link
   */
  const footerNav = (text: string, link: string, position: 'right' | 'middle' | 'left', _action?: () => void) => {
    if (link === hidden) {
      return null;
    }

    return (
      <ButtonGroup position={position} toLayout='grid' layout={"grid"} setLayout={() => { }} >
        <Link passHref={true} href={link} as={link}>
          <a target={link.startsWith('http') ? '_blank' : '_self'} className="text-white p-2 block" onClick={_action}>
            {text}
          </a>
        </Link>
      </ButtonGroup >
    );
  }

  return (
    <div className='flex flex-col justify-center text-center mt-10 pb-5 bg-gradient-to-t from-brand-darker to-transparent border-t border-gray-700'>
      <div className="flex flex-row justify-center">
        <div className='grid grid-cols-2 md:grid-cols-5 gap-2 text-center p-5'>
          {footerNav('🕟 Time Is', '/', 'left')}
          {footerNav('⌚ Time Was', '/TimeWas', 'left')}
          {footerNav('🤔 Suggestions', '', 'middle', () => window.open('mailto:support@astrx.dev?subject=Issue Report on and-the-time-is.web&body=Please describe the issue you are facing. Add the page on which the issue occured and screenshots if available.'))}
          {footerNav('🪲 Report Bug', 'https://github.com/dev-asterix/and-the-time-is.web/issues/new?assignees=&labels=&template=bug_report.md&title=', 'middle')}
          {footerNav('🚀 Contribute', 'https://github.com/dev-asterix/and-the-time-is', 'right')}
        </div>
      </div>
      <div className='text-red-400 font-medium text-sm mt-4 px-4'>
        *Disclaimer: Data inaccuracies are expected.
      </div>
      <div className='text-brand-accent font-semibold text-sm mt-2'>
        source: <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones" className="hover:text-brand-primary transition-colors underline">Wikipedia tz database</a>
      </div>
    </div>
  )
}

export default Footer;
