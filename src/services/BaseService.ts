import { Pool } from 'pg';
import pool from '../config/database';

export abstract class BaseService<T> {
    protected pool: Pool;
    protected tableName: string;

    constructor(tableName: string) {
        this.pool = pool;
        this.tableName = tableName;
    }

    protected async query(text: string, params?: any[]): Promise<any> {
        const client = await this.pool.connect();
        try {
            return await client.query(text, params);
        } finally {
            client.release();
        }
    }

    async getById(id: string): Promise<T | null> {
        const result = await this.query(
            `SELECT * FROM ${this.tableName} WHERE id = $1`,
            [id]
        );
        return result.rows[0] || null;
    }

    async getAll(): Promise<T[]> {
        const result = await this.query(`SELECT * FROM ${this.tableName}`);
        return result.rows;
    }

    async create(item: Partial<T>): Promise<T> {
        const columns = Object.keys(item).join(', ');
        const values = Object.values(item);
        const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
        
        const result = await this.query(
            `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`,
            values
        );
        return result.rows[0];
    }

    async update(id: string, item: Partial<T>): Promise<T | null> {
        const entries = Object.entries(item);
        const setClause = entries.map(([key], i) => `${key} = $${i + 2}`).join(', ');
        const values = [...Object.values(item), id];
        
        const result = await this.query(
            `UPDATE ${this.tableName} SET ${setClause} WHERE id = $1 RETURNING *`,
            values
        );
        return result.rows[0] || null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.query(
            `DELETE FROM ${this.tableName} WHERE id = $1`,
            [id]
        );
        return result.rowCount > 0;
    }
} 