import React from 'react'

export default function RenderTodo(props) {
    return (
        <div>
                {props.data ?
                    props.data.map(el=>{
                        return (
                            <div>
                                <h2>{el.title}</h2>
                                <div>
                                    {!el.status ?
                                        <button
                                            value={el.id}
                                        >
                                        
                                        Done</button>
                                        :null
                                    }

                                <button value={el.id}>
                                Delete</button>
                                <button value={el.id}>Edit</button>
                                </div>
                            </div>
                        )
                    })
                    :<h3>Пока данных нет</h3>
                }
        </div>
    )
}