export type Animal = "dog" | "cat" | "rabbit" | "small & furry" | "horse" | "bird" | "scales, fins, & other" | "barnyard";

export interface Pet {
    id: number;
    name: string;
    animal: Animal;
    description: string;
    breed: string;
    images: string[];
    city: string;
    state: string;
}

export interface PetAPIResponse {
    numberOfResults: number;
    startIndex: number;
    endInde: number;
    hasNext: boolean;
    pets: Pet[];
}