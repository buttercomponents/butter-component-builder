import React from 'react';

let ListItem = (props) => (<li>
    {props.children}
</li>)

let List = (props) =>
    <ul>
        {props.items.length && props.items.map((it, k) => {
             let ItemComponent = props.itemComponent;
            return (
                    <div  key={k} onClick={() => props.onClick?props.onClick(it, k):console.error('Unhandled click event', it)}>
                    <ItemComponent {...it}
                    />
                    </div>
            )
         })}
    </ul>;

List.defaultProps = {
    items: ['haha', 'hoho'],
    itemComponent: ListItem
}

export default List;
