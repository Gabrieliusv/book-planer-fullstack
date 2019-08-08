import { GET_CHARACTERS, ADD_CHARACTER, DELETE_CHARACTER, DELETE_TRASH, RESTORE_CHARACTER, RESTORE_CHARACTER_AT_INDEX, EDIT_CHARACTER} from '../actions/types';

const initialState = {
    charactersInfo: [{
        abilities: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. Maecenas vitae risus lobortis, facilisis turpis vitae, bibendum augue. ",
        born: "1889-09-16",
        characterD: "Phasellus commodo nec felis et lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris at accumsan dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ultricies ante quis dolor gravida, at auctor leo vestibulum.",
        id: "4A7jg2SQZ",
        live: "Casterly Rock",
        name: "Thyrion Lannister",
        philosophy: "Phasellus vehicula dui ac orci porta congue. Etiam gravida sem ut nulla laoreet sagittis. Phasellus tincidunt lorem ut viverra rhoncus. Nullam in neque at elit rhoncus facilisis non quis nunc. Praesent ultricies faucibus nisl. Vivamus porta viverra ligula, et ultrices quam laoreet nec. Integer venenatis nisi non aliquet tempus. Vestibulum justo magna, feugiat id molestie eget, condimentum eu arcu.",
        physicalD: "Aenean gravida luctus ipsum, ac congue nulla feugiat et. Phasellus orci diam, eleifend vitae ultricies facilisis, pellentesque eu arcu. Suspendisse congue massa mollis lectus maximus, at sodales eros congue. Sed sed iaculis mi. Sed lacinia mauris leo, ut porttitor libero euismod ullamcorper. Integer eu arcu et augue consequat varius feugiat non odio. ",
        story: [
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1849-05-16',
                effect: 'Positive',
                intensity: 2,
                title: 'Maecenas vitae',
                beforeColor: '#9EE09E',
                color: '#9EE09E'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1858-07-09',
                effect: 'Positive',
                intensity: 3,
                title: 'Lorem ipsum dolor',
                beforeColor: '#9EE09E',
                color: '#9EE09E'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1862-04-03',
                effect: 'Negative',
                intensity: 5,
                title: 'Maecenas vitae',
                beforeColor: '#9EE09E',
                color: '#FF6663'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1862-06-13',
                effect: 'Positive',
                intensity: 3,
                title: 'Quisque sollicitudin',
                beforeColor: '#FF6663',
                color: '#9EE09E'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1862-10-17',
                effect: 'Positive',
                intensity: 7,
                title: 'Nullam nec eleifend',
                beforeColor: '#9EE09E',
                color: '#9EE09E'
            },

        ],
    },
    {
        abilities: "Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. Maecenas vitae risus lobortis, facilisis turpis vitae, bibendum augue. ",
        born: "1708-15-16",
        characterD: "Nullam porttitor, lorem ac fringilla pellentesque, nunc massa faucibus diam, vitae facilisis sem ligula condimentum nibh. Phasellus vehicula dui ac orci porta congue. Etiam gravida sem ut nulla laoreet sagittis. Phasellus tincidunt lorem ut viverra rhoncus. Nullam in neque at elit rhoncus facilisis non quis nunc. Praesent ultricies faucibus nisl. Vivamus porta viverra ligula, et ultrices quam laoreet nec. Integer venenatis nisi non aliquet tempus. Vestibulum justo magna, feugiat id molestie eget, condimentum eu arcu.",
        id: "4d7jg2SQZ",
        live: "Dragonstone",
        name: "Stannis Baratheon",
        philosophy: "In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. Maecenas vitae risus lobortis, facilisis turpis vitae, bibendum augue. ",
        physicalD: "Consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. Maecenas vitae risus lobortis, facilisis turpis vitae, bibendum augue. Pellentesque ac dui dapibus, convallis purus nec, euismod lacus. Quisque vitae volutpat diam, sit amet venenatis est. Maecenas non sem condimentum, rhoncus metus a, egestas orci.",
        story: [
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1749-03-11',
                effect: 'Negative',
                intensity: 1,
                title: 'Etiam molestie nibh',
                beforeColor: '#FF6663',
                color: '#FF6663'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1758-07-10',
                effect: 'Negative',
                intensity: 3,
                title: 'Nullam nec eleifend',
                beforeColor: '#FF6663',
                color: '#FF6663'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1762-04-13',
                effect: 'Negative',
                intensity: 1,
                title: 'Quisque sollicitudin ultrices',
                beforeColor: '#FF6663',
                color: '#FF6663'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1767-06-18',
                effect: 'Positive',
                intensity: 7,
                title: 'Consectetur adipiscing',
                beforeColor: '#FF6663',
                color: '#9EE09E'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1768-10-17',
                effect: 'Neutral',
                intensity: 2,
                title: 'In aliquam iaculis',
                beforeColor: '#9EE09E',
                color: '#CC99C9'
            },
        ],
    },
    {
        abilities: "Duis ultricies neque sed varius maximus. Sed faucibus vitae felis ac tempus. Aliquam eu eros sagittis libero pretium iaculis ac non libero. Vestibulum egestas nibh massa, vitae placerat nibh pulvinar in. In venenatis scelerisque augue, sed iaculis felis faucibus ullamcorper. Sed luctus ligula at pellentesque malesuada.",
        born: "1719-15-16",
        characterD: "Phasellus commodo nec felis et lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris at accumsan dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ultricies ante quis dolor gravida, at auctor leo vestibulum.",
        id: "4d7jg2SQZ44",
        live: "Winterfell",
        name: "Eddard Stark",
        philosophy: "Phasellus iaculis mattis purus. Quisque rutrum luctus mauris, eget finibus mauris. Etiam id nisi enim. Duis dictum velit sed ante semper commodo. Curabitur tristique pulvinar risus, quis dignissim ex porta sit amet. Praesent ac nunc ac lectus dignissim rutrum. Aenean pretium pellentesque lacus, at euismod risus viverra et. ",
        physicalD: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. Maecenas vitae risus lobortis, facilisis turpis vitae, bibendum augue. ",
        story: [
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1749-03-11',
                effect: 'Negative',
                intensity: 0,
                title: 'Etiam molestie nibh',
                beforeColor: '#FF6663',
                color: '#FF6663'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1758-07-10',
                effect: 'Negative',
                intensity: 8,
                title: 'Nullam nec eleifend',
                beforeColor: '#FF6663',
                color: '#FF6663'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1762-04-13',
                effect: 'Negative',
                intensity: 9,
                title: 'Quisque sollicitudin ultrices',
                beforeColor: '#FF6663',
                color: '#FF6663'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1767-06-18',
                effect: 'Positive',
                intensity: 10,
                title: 'Consectetur adipiscing',
                beforeColor: '#FF6663',
                color: '#9EE09E'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1768-10-17',
                effect: 'Neutral',
                intensity: 5,
                title: 'In aliquam iaculis',
                beforeColor: '#9EE09E',
                color: '#CC99C9'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1769-11-07',
                effect: 'Neutral',
                intensity: 2,
                title: 'Lectus ullamcorper',
                beforeColor: '#CC99C9',
                color: '#CC99C9'
            },
            {
                event: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquam iaculis ligula, ac bibendum magna tincidunt a. Nullam nec eleifend lectus. Quisque sollicitudin ultrices hendrerit. Etiam molestie nibh id mollis interdum. Donec hendrerit dignissim diam, nec cursus lectus ullamcorper finibus. ',
                time: '1772-04-12',
                effect: 'Positive',
                intensity: 6,
                title: 'Consectetur adipiscing',
                beforeColor: '#CC99C9',
                color: '#9EE09E'
            },
        ]
    }],
    inTrash: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHARACTERS:
            return {
                ...state
            }
        case DELETE_CHARACTER:
            return {
                ...state,
                charactersInfo: state.charactersInfo.filter(i => i.id !== action.payload),
                inTrash: [...state.inTrash, state.charactersInfo.find(i => i.id === action.payload)]
            }
        case ADD_CHARACTER:
            return {
                ...state,
                charactersInfo: [...state.charactersInfo, action.payload]
            }
        case DELETE_TRASH:
            return {
                ...state,
                inTrash: state.inTrash.filter(a => action.payload.every(b => a !== b))
            }
        case RESTORE_CHARACTER:
            return {
                ...state,
                charactersInfo: [...state.charactersInfo, ...action.payload],
                inTrash: state.inTrash.filter(a => action.payload.every(b => a !== b))
            }
        case RESTORE_CHARACTER_AT_INDEX:
            let newState = [...state.charactersInfo];
            newState.splice(action.index, 0, action.payload);
            return {
                ...state,
                charactersInfo: newState,
                inTrash: state.inTrash.filter(a => a !== action.payload)
            }
        case EDIT_CHARACTER:
            let editState = [...state.charactersInfo];
            editState.splice(action.index, 1, action.payload);
            return {
                ...state,
                charactersInfo: editState,
            }
        default:
            return state;
    }
}