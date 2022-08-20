import './CollectionEdit.css'

const NormalTableRow = ({question, answer}: {question: string,answer: string}) => {
    return(
        <tr className='normalRevealRow'>
            <td className='normalRowTd'>
                <input type="text" id="quest" name="quest"></input>    
            </td>
            <td className={`normalAnswerTd1`}>
                <input type="text" id="def" name="def"></input> 
            </td>
        </tr>
    )
}

export const CollectionEdit = () => {
    return(
        <div className='editCollectionTable'>
            <form className='editTableForm'>
                <table className='editTable'>
                <colgroup>
                    <col className="questionColumn"></col>
                    <col className="answerColumn"></col>
                </colgroup>
                <tbody>
                <tr className='fboldRow'>
                    <td className='fheaderRow'>
                        <div className='ftdText'>Object</div>
                    </td>
                    <td className='fheaderRow'>
                        <div className='ftdText'>Definition</div>
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
            </form>
        </div>
    )
}