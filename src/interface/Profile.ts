export interface CreateProfileRequest {
    user_id: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    address?: string;
    country?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    medical_conditions?: string;
    allergies?: string;
    blood_type?: string;
}

export interface UpdateProfileRequest {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    address?: string;
    country?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    medical_conditions?: string;
    allergies?: string;
    blood_type?: string;
}
