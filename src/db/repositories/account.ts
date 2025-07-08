import { db } from '@/db/database';
import { Account, NewAccount, UpdateAccount } from '@/db/types';

/**
 * Find an account by ID
 * @param id The account ID
 * @returns The account or undefined if not found
 */
export async function findById(id: string): Promise<Account | undefined> {
  return await db
    .selectFrom('account')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find an account by provider and account ID
 * @param providerId The provider ID
 * @param accountId The account ID
 * @returns The account or undefined if not found
 */
export async function findByProviderAccount(
  providerId: string,
  accountId: string
): Promise<Account | undefined> {
  return await db
    .selectFrom('account')
    .selectAll()
    .where('providerId', '=', providerId)
    .where('accountId', '=', accountId)
    .executeTakeFirst();
}

/**
 * Find accounts by user ID
 * @param userId The user ID
 * @returns Array of accounts for the user
 */
export async function findByUserId(userId: string): Promise<Account[]> {
  return await db
    .selectFrom('account')
    .selectAll()
    .where('userId', '=', userId)
    .execute();
}

/**
 * Get all accounts
 * @returns Array of all accounts
 */
export async function findAll(): Promise<Account[]> {
  return await db
    .selectFrom('account')
    .selectAll()
    .execute();
}

/**
 * Create a new account
 * @param account The account data to insert
 * @returns The created account
 */
export async function create(account: NewAccount): Promise<Account> {
  return await db
    .insertInto('account')
    .values(account)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update an account
 * @param id The account ID
 * @param account The account data to update
 * @returns The updated account
 */
export async function update(id: string, account: UpdateAccount): Promise<Account | undefined> {
  return await db
    .updateTable('account')
    .set(account)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete an account
 * @param id The account ID
 * @returns True if the account was deleted, false otherwise
 */
export async function delete_(id: string): Promise<boolean> {
  const result = await db
    .deleteFrom('account')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

/**
 * Delete accounts by user ID
 * @param userId The user ID
 * @returns Number of deleted accounts
 */
export async function deleteByUserId(userId: string): Promise<number> {
  const result = await db
    .deleteFrom('account')
    .where('userId', '=', userId)
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

// Export all functions as a single object for convenience
export const accountRepository = {
  findById,
  findByProviderAccount,
  findByUserId,
  findAll,
  create,
  update,
  delete: delete_,
  deleteByUserId
};