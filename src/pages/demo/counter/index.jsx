import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { AB, B } from 'src-components';
import {
    increment,
    decrement,
    reset,
    incrementAsync,
} from '@/redux/actions/counter';

function Counter(props) {
    return (
        <div>
            <AB />
            <B />
            <div>this is counter~ redux 功能演示</div>
            <div>当前计数为{props.count}</div>
            <button onClick={() => props.increment()}>自增</button>
            <button onClick={() => props.incrementAsync()}>自增异步</button>
            <button onClick={() => props.decrement()}>自减</button>
            <button onClick={() => props.reset()}>重置</button>
        </div>
    );
}

export default connect((state) => state.counter, {
    increment,
    decrement,
    reset,
    incrementAsync,
})(Counter);
