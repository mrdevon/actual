import {
  getDefaultTransactionTableColumns,
  parseTransactionTableColumns,
} from './columns';

describe('transaction table columns', () => {
  it('hides the number column by default, just before payee', () => {
    const columns = getDefaultTransactionTableColumns();
    const numberIdx = columns.findIndex(c => c.id === 'tracking_number');

    expect(columns[numberIdx]).toEqual({ id: 'tracking_number', hidden: true });
    expect(columns[numberIdx + 1].id).toBe('payee');
  });

  it('inserts the number column hidden before payee in a saved layout', () => {
    const columns = parseTransactionTableColumns(
      JSON.stringify([
        { id: 'payee', hidden: false },
        { id: 'date', hidden: false },
        { id: 'payment', hidden: false },
        { id: 'deposit', hidden: false },
      ]),
    );
    const numberIdx = columns.findIndex(c => c.id === 'tracking_number');

    expect(columns[numberIdx]).toEqual({ id: 'tracking_number', hidden: true });
    expect(columns[numberIdx + 1].id).toBe('payee');
  });

  it('keeps a saved visible number column', () => {
    const columns = parseTransactionTableColumns(
      JSON.stringify([
        { id: 'date', hidden: false },
        { id: 'tracking_number', hidden: false },
      ]),
    );

    expect(columns.find(c => c.id === 'tracking_number')).toEqual({
      id: 'tracking_number',
      hidden: false,
    });
  });
});
