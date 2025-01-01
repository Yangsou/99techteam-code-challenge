interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance extends WalletBalance {
  /**
   * note: Reuse interface WalletBalance
   */
  formatted: string;
}

interface Props extends BoxProps {
  /**
   * Note: Define some properties of WalletPage
   */
  children?: React.ReactNode;
  className?: string;
  rowClassName?:string;
}

const blockchainPriority = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;

/**
 * Note: Remove props: Props because React.FC has provided this type
 */
const WalletPage: React.FC<Props> = (props) => {
  const { children, rowClassName, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  /**
   * Note: define on object type key-value and mapping with key instead of running switch case
   */
	const getPriority = (blockchain: string): number => {
    return blockchainPriority[blockchain] ?? -99;
	}

  /**
   * Note: 
   * - Use field currency instead of blockchain
   * - Destructure amount, currency instead of object balance
   * - Remove unused dependence prices 
   */
  const sortedBalances = useMemo(() => {
    return balances
      .filter(({amount, currency}: WalletBalance) => 
        getPriority(currency) > -99 && amount <= 0
      )
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.currency);
        const rightPriority = getPriority(rhs.currency);
        return rightPriority - leftPriority;
      });
  }, [balances]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({
    ...balance,
    formatted: balance.amount.toFixed()
  }))

  /**
   * Note: Destructuring object balance with amount, currency, formatted
   * - Field key should not use index
   * - I defined new prop rowClassName 
   */
  const rows = useMemo(() => 
    formattedBalances.map(({amount, currency, formatted}) => (
      <WalletRow 
        className={rowClassName}
        key={currency}
        amount={amount}
        usdValue={prices[currency] * amount}
        formattedAmount={formatted}
      />
    )),
    [formattedBalances, prices, rowClassName]
  );

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}