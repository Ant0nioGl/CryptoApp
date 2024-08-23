import './Tab.css'

function Tab(props) {
    let percentChangeColor = props.percentChange.includes('-') ? 'red' : 'green';
    if (props.rank === "#") {
        percentChangeColor = 'black';
    }

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