
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createAt: number;
}


export const seedData: SeedData = {
    entries: [
        {
            description: 'Consectetur pariatur deserunt non anim ea excepteur sint amet in nostrud in sint.',
            status: 'pending',
            createAt: Date.now(),
        },
        {
            description: 'Esse cupidatat commodo nisi consequat duis occaecat pariatur aliqua in ipsum eiusmod qui.',
            status: 'in-progress',
            createAt: Date.now() - 1000000,
        },
        {
            description: 'Enim fugiat occaecat ad amet in dolore duis occaecat eiusmod adipisicing tempor.',
            status: 'finished',
            createAt: Date.now() - 100000,
        },
    ]
}