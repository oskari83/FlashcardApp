import './Footer.css';

export const Footer2 = ({status}: {status:boolean}) => {
    const giturl = 'https://github.com/oskari83/FlashcardApp'

    return(
        <div className={`footer${status===true ? '2' : ''}`}>
            <div className={`footerInner${status===true ? '2' : ''}`}>
            <div className='footerLogo' onClick={() => window.open(giturl, '_blank')}></div>
            <div className='footerTextClickable' onClick={() => window.open(giturl, '_blank')}>
                <p>Repository Link</p>
            </div>
            <div className='footerText'>
                <p>Created by: Oskari Peltonen</p>
            </div>
            </div>
        </div>
    )
}

export const Footer = () => {
    const giturl = 'https://github.com/oskari83/FlashcardApp'

    return(
        <div className='footer'>
            <div className='footerInner'>
            <div className='footerLogo' onClick={() => window.open(giturl, '_blank')}></div>
            <div className='footerTextClickable' onClick={() => window.open(giturl, '_blank')}>
                <p>Repository Link</p>
            </div>
            <div className='footerText'>
                <p>Created by: Oskari Peltonen</p>
            </div>
            </div>
        </div>
    )
}