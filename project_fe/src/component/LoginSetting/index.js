import * as React from 'react';
import Login from './login'
import Setting from './setting'
import Model from './model'


export default (props) => {
    const [step, setStep] = React.useState(0);

    const propsSetStep = (elem) => {
        setStep(elem)
    }

    return (
        <div className='outer-div'>
            <div className='inner-div'>
                {step == 0 ? <Login step={step} propsSetStep={propsSetStep}></Login> : null}
                {step == 1 ? <Setting step={step} propsSetStep={propsSetStep}></Setting> : null}
                {step == 2 ? <Model step={step} propsSetStep={propsSetStep}></Model> : null}
            </div>
        </div>
    );
}