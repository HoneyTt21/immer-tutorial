import React, {useCallback, useState, useRef} from "react";
import ErrorBoundary from "./ErrorBoundary";
import produce from "immer";

const App = () => {
    const nextId = useRef(1);
    const [form, setForm] = useState({name: "", username: ""});
    const [data, setData] = useState({
        array: [],
        uselessValue: null,
    });

    const onChange = useCallback((e) => {
        const {name, value} = e.target;
        setForm(
            produce((draft) => {
                draft[name] = value;
            })
        );
    }, []);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const info = {
                id: nextId.current,
                name: form.name,
                username: form.username,
            };

            setData(
                produce((draft) => {
                    draft.array.push(info);
                })
            );

            setForm({
                name: "",
                username: "",
            });
            nextId.current += 1;
        },
        [form.username, form.name]
    );

    const onRemove = useCallback((id) => {
        setData(
            produce((draft) => {
                draft.array.splice(
                    draft.array.findIndex((info) => info.id === id),
                    1
                );
            })
        );
    }, []);

    return (
        <ErrorBoundary>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        name="username"
                        placeholder="ID"
                        value={form.username}
                        onChange={onChange}
                    />
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={onChange}
                    />
                    <button type="submit">Submit</button>
                </form>
                <div>
                    <ul>
                        {data.array.map((info) => (
                            <li
                                key={info.id}
                                onDoubleClick={() => onRemove(info.id)}
                            >
                                {info.username} ({info.name})
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default App;
