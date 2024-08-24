import './Tab.css';

function Tab(props) {
    if (props.name === "Header"){
        return (
            <div className="tab-container header">
                <span>
                    <a className='name'>{props.rank}</a>
                    <img src={props.cryptoIcon} alt="crypto icon"></img>
                </span>
                <a>{props.marketCap}</a>
                <a>{props.price}</a>
                <a>
                    <select name="percent-change-dropdown"
                            id='percent-change-dropdown'
                            onChange={(e) => props.onChangePercentChange(e.target.value)}>
                        <option value="percent_change_24h">% 24h</option>
                        <option value="percent_change_7d">% 7d</option>
                        <option value="percent_change_30d">% 30d</option>
                        <option value="percent_change_60d">% 60d</option>
                        <option value="percent_change_90d">% 90d</option>
                    </select>
                </a>
            </div>
        );
    }

    let percentChangeColor = props.percentChange.includes('-') ? 'red' : 'green';
    //No changes in price
    let percentChangeZero = null;
    if (props.percentChange.includes('0.00%')) {
        percentChangeColor = 'black';
        percentChangeZero = '0.00%'
    }

    return (
        <div className="tab-container">
            <span>
                <a className='name'>{props.rank} &nbsp; {props.symbol}</a>
                <img src={props.cryptoIcon} alt="crypto icon"></img>
            </span>
            <a>{props.marketCap}</a>
            <a>{props.price}</a>
            <a style={{ color: percentChangeColor }}>{props.percentChange.includes('0.00%') ? percentChangeZero : props.percentChange}</a>


        </div>
    );
}

export default Tab;