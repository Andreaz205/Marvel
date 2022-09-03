import {Field, Formik, Form} from "formik";
import {useState} from 'react'
import * as Yup from 'yup'
import useApi from '../../api/api'
import {Link} from 'react-router-dom'
import './SearchingForm.scss'


type FormType = {
    name: string
}








const SearchingForm = () => {
    const {getCharacterByName} = useApi()
    const [character, setCharacter] = useState<any>(null)

    return (
        <Formik
            validationSchema={Yup.object().shape({
                name: Yup.string().required('This field is required')
            })}
            onSubmit={(values:FormType, actions) => {
                setCharacter(null) // зачем эта строка??????????????????????????????????????
                getCharacterByName(values.name)
                    .then((res) => {
                        setCharacter(res)
                    })
                actions.setSubmitting(false)
            }}
            initialValues={{
                name: '',
            }}
        >
            {({errors, touched}) => (
                <Form className='form'>
                    <h2>Or find a character by name</h2>
                    <div className="formBlock">
                        <Field name='name' placeholder='Enter name' />
                        <button type='submit' className='form__btn'>
                            Submit
                        </button>
                    </div>

                    {errors.name && touched.name ? (
                        <div className="error">{errors.name}</div>
                    ) : null}

                    {!character ? null : character.length > 0 ? (
                        <div className="form__result">
                            <div className="found">
                                There is ! Vist {character[0].name} page?
                            </div>
                            <Link
                                to='/formCharacter'
                                state={{charInfo: character}}
                                className='form__result__btn'
                            >
                                TO PAGE
                            </Link>
                        </div>
                    ) : character.length === 0 ? (
                        <div className="error">There`s no such characters</div>
                    ): null}
                </Form>
            )}
        </Formik>
    )
}

export default SearchingForm