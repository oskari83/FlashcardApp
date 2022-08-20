import './CollectionEdit.css'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoMdClose } from 'react-icons/io'

const NormalTableRow = ({question, answer}: {question: string,answer: string}) => {
    return(
        <tr className='enormalRevealRow'>
            <td className='enormalRowTd'>
                <span className='inputspan' role="textarea" contentEditable>{question}</span>    
            </td>
            <td className='enormalRowTd'>
                <span className='inputspan' role="textarea" contentEditable>{answer}</span>  
            </td>
            <td className='enormalRowTd'>
                <div className='delButton'>
                    <IoMdClose size='20px' color={`rgb(70, 70, 70)`} />
                </div>
            </td>
        </tr>
    )
}

export const CollectionEdit = () => {
    return(
        <div className='editCollectionTable'>
            <form className='editTableForm'>
                
                <div className='aboveTableContainer'>
                    <div className='submitButton'>Save</div>
                    <div className='cancelChanges'>Cancel changes</div>
                </div>

                <table className='editTable'>
                <colgroup>
                    <col className="editquestionColumn"></col>
                    <col className="editanswerColumn"></col>
                    <col className='editdeleteColumn'></col>
                </colgroup>
                <tbody>
                <tr className='eboldRow'>
                    <td className='eheaderRow'>
                        <div className='etdText'>Object</div>
                    </td>
                    <td className='eheaderRow'>
                        <div className='etdText'>Definition</div>
                    </td>
                    <td className='eheaderRow'>
                        <div className='etdText'>
                            <div className='editDelIcon'>
                                <RiDeleteBinLine size='20px' color={`rgb(70, 70, 70)`} />
                            </div>
                        </div>
                    </td>
                </tr>
                    <NormalTableRow question={"non-price determinants of demand"} answer={"1 changes in income 2 habits, fashion, tastes 3 substitutes and complements 4 demographic changes 5 ad and gov"}/>
                    <NormalTableRow question={"the law of supply"} answer={"there is a positive relationship between the quantity supplied of a product and its price"}/>
                    <NormalTableRow question={"competetive supply"} answer={"output of a product takes place as an alternative to other products, apples and oranges"}/>
                    <NormalTableRow question={"Market equilibrium"} answer={"occurs when the quantity demanded for a product is equal to the quantity supplied of the product"}/>
                    <NormalTableRow question={"allocative efficiency"} answer={"happens when resources are distributed so that consumers and producers get the maximum possible benefit meaning no one can be made beter off without making someone else worse off"}/>
                    <NormalTableRow question={"where allocative efficiency occurs"} answer={"at the market equilibrium as community surplus is maximised"}/>
                </tbody>
                </table>

                <div className='addAnotherRowContainer'>
                    <div className='addRowButton'>+ Add</div>
                </div>

                <div className='belowTableContainer'>
                    <div className='submitButton'>Save</div>
                    <div className='cancelChanges'>Cancel changes</div>
                </div>
            </form>
        </div>
    )
}