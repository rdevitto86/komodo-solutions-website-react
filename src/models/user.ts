import Address from './address';
import Billing from './billing';
import Company from './company';
import Order from './order';
import { UserTypes, isUser, UserJSON } from '../npm-libs/ts/types/user-types';
import { isAddress } from '../npm-libs/ts/types/address-type';
import { isBilling } from '../npm-libs/ts/types/billing-type';
import { isCompany } from '../npm-libs/ts/types/company-type';
import { isOrder, OrderJSON } from '../npm-libs/ts/types/order-types';
import PriorityQueue from '../npm-libs/ts/data/data-structures/priority-queues/priority-queue';

/**
 * Defines a new User model
 * @version 1.0.0
 */
export default class User {
    /**
     * Unique user identifier
     */
    id: string = '*';

    /**
     * Account type (ex. Guest, Business, etc.)
     */
    type: number = 1;

    /**
     * User's first name
     */
    firstName: string | null = null;

    /**
     * User's last name
     */
    lastName: string | null = null;

    /**
     * User's suffix (ex. Sr, Jr)
     */
    suffix: string | null = null;

    /**
     * User's email address
     */
    email: string | null = null;

    /**
     * User's phone number
     */
    phone: string | null = null;

    /**
     * User's address information
     */
    address: Address | null = null;

    /**
     * User's company information
     */
    company: Company | null = null;

    /**
     * User's billing information
     */
    billing: Billing | null = null;

    /**
     * User invoice history
     */
    invoices: PriorityQueue<Order> = new PriorityQueue<Order>();

    /**
     * Determines if the user model has changes
     */
    hasEdits: boolean = false;

    /**
     * @param {UserJSON | User} [props] exsisting user details
     */
    constructor(props?: UserJSON | User) {
        if (isUser(props)) {
            const {
                id,
                type,
                firstName,
                lastName,
                suffix,
                email,
                phone,
                address,
                company,
                billing,
                invoices,
            } = props;

            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;

            if (typeof type === 'number' && UserTypes[type]) {
                this.type = type;
            }
            if (typeof suffix === 'string') {
                this.suffix = suffix;
            }
            if (typeof phone === 'string') {
                this.phone = phone;
            }
            if (isAddress(address)) {
                this.address = new Address(address);
            }
            if (isBilling(billing)) {
                this.billing = new Billing(billing);
            }
            if (isCompany(company)) {
                this.company = new Company(company);
            }
            if (invoices instanceof Array) {
                // loop through invoices and prioritze invoices
                for (const invoice of invoices) {
                    if (invoice && typeof invoice === 'object') {
                        this.addInvoice(invoice.lineItem, invoice.priority);
                    }
                }
            }
        }
    }

    /**
     * Adds an invoice to the user's history
     * @param {OrderJSON | Order} invoice order invoice
     * @param {number} [priority] invoice priority. Default is undefined.
     */
    addInvoice(invoice: OrderJSON | Order, priority?: number) {
        if (isOrder(invoice)) {
            this.invoices.enqueue(
                (invoice instanceof Order) ? invoice : new Order(invoice),
                priority
            );
        }
    }

    /**
     * Clears the invoice list
     */
    clearInvoices() {
        this.invoices.clear();
    }

    /**
     * User's full name (ex. John Smith Sr.)
     */
    get fullName() {
        const { firstName, lastName, suffix } = this;
        return `${firstName || ''} ${lastName || ''} ${suffix || ''}`;
    }
}