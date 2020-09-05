import React, { Component } from 'react';
import Button from '../../Component/UI/Buttons/Button';
import './feedBackForm.css';
import Input from '../../Component/UI/Input/Input';
import { updateObject, checkValidity } from '../../Shared/utility';
import StarRatingComponent from 'react-star-rating-component';

class FeedbackData extends Component {
    state = {
        feedbackForm: {
            review: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Your Review'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            number: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your Number'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }

        },
        formIsValid: false,
        loading: false,
        rating: 1
    }

    onStarHover(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    formHandler = (event) => {
        event.preventDefault();
        alert('Form Submitted');
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.feedbackForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.feedbackForm[inputIdentifier].validation),
            touched: true
        });
        const updateFeedbackForm = updateObject(this.state.feedbackForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updateFeedbackForm) {
            formIsValid = updateFeedbackForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            feedbackForm: updateFeedbackForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.feedbackForm) {
            formElementArray.push({
                id: key,
                config: this.state.feedbackForm[key]
            })
        }
        const { rating } = this.state;
        let starColor = rating < 4 ? 'red' : rating >= 4 && rating < 8 ? '#ffb400' : 'green';
        let form = (<form onSubmit={this.formHandler}>
            <StarRatingComponent
                name="rate1"
                starCount={10}
                value={rating}
                starColor={starColor}
                onStarHoverOut={this.onStarHover.bind(this)}
            />
            {formElementArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
        </form>);
        return (
            <div className='ContactData'>
                <h4>Please Give your Feedback:</h4>
                {form}
            </div>
        );
    }
}


export default FeedbackData;