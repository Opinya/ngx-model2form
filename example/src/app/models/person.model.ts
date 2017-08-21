export interface Person {
    name: string;
    address: {
        houseNumber: number;
        streetName: string;
        city: string;
    },
    gender: gender;
    height: number;
    birthdate: number;
    childrenNames: string[];
    
}

export type gender = 'male' | 'female';
