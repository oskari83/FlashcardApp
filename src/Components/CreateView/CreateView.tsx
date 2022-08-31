import './CreateView.css';
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoMdClose } from 'react-icons/io'

const NormalCreateTableRow = ({question, answer}: {question: string,answer: string}) => {
    return(
        <tr className='cnormalRevealRow'>
            <td className='cnormalRowTd'>
                <span className='cinputspan' role="textarea" contentEditable>{question}</span>    
            </td>
            <td className='cnormalRowTd'>
                <span className='cinputspan' role="textarea" contentEditable>{answer}</span>  
            </td>
            <td className='cnormalRowTd'>
                <div className='cdelButton'>
                    <IoMdClose size='20px' color={`rgb(70, 70, 70)`} />
                </div>
            </td>
        </tr>
    )
}

export const CreateView = () => {
    return(
        <>
        <div className="createviewContainerMain">

            <div className='createViewName'>Create Collection</div>

            <div className="collectionNameContainer">
                <input type="text" className='nameInput'  placeholder="Name..."></input>
                <div className='submitButtonName'>Create</div>
            </div>

            <div className='creationContainer'>
                <div className='createCollectionTable'>
                    <form className='cTableForm'>
            
                        <table className='createTable'>
                        <colgroup>
                            <col className="cquestionColumn"></col>
                            <col className="canswerColumn"></col>
                            <col className='cdeleteColumn'></col>
                        </colgroup>
                        <tbody>
                        <tr className='cboldRow'>
                            <td className='cheaderRow'>
                                <div className='ctdText'>Object</div>
                            </td>
                            <td className='cheaderRow'>
                                <div className='ctdText'>Definition</div>
                            </td>
                            <td className='cheaderRow'>
                                <div className='ctdText'>
                                    <div className='cDelIcon'>
                                        <RiDeleteBinLine size='20px' color={`rgb(70, 70, 70)`} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                            <NormalCreateTableRow question={""} answer={""}/>
                            <NormalCreateTableRow question={""} answer={""}/>
                            <NormalCreateTableRow question={""} answer={""}/>
                            <NormalCreateTableRow question={""} answer={""}/>
                            <NormalCreateTableRow question={""} answer={""}/>
                        </tbody>
                        </table>

                        <div className='caddAnotherRowContainer'>
                            <div className='addRowButton'>+ Add</div>
                        </div>

                        <div className='cbelowTableContainer'>
                            <div className='submitButton'>Create</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}