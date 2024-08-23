import './Tab.css'

function Tab(props) {
    if (props.name == "Header"){
        return (
            <div className="tab-container header">
                <span>
                    <a className='name'>{props.rank}</a>
                    <img src={props.cryptoIcon} alt="crypto icon"></img>
                </span>
                <a>{props.marketCap}</a>
                <a>{props.price}</a>
                <a style={{ color: 'black' }}>{props.percentChange}</a>
                <img src={props.graphIcon} alt="graph"></img>
            </div>
        );
    }

    let percentChangeColor = props.percentChange.includes('-') ? 'red' : 'green';

    return (
        <div className="tab-container">
            <span>
                <a className='name'>{props.rank} &nbsp; {props.symbol}</a>
                <img src={props.cryptoIcon} alt="crypto icon"></img>
            </span>
            <a>{props.marketCap}</a>
            <a>{props.price}</a>
            <a style={{ color: percentChangeColor }}>{props.percentChange}</a>
            <img src={props.graphIcon} alt="graph"></img>
        </div>
    );
}

export default Tab;