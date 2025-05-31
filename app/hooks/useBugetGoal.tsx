import { useQuery, useMutation } from "@apollo/client";
import { GET_BUDGET_GOAL } from "../graphQL/queries/budget.query";
import { SET_BUDGET_GOAL } from "../graphQL/mutations/budget.mutation";
export const useBudgetGoal = (month: string) => {
    const { data, loading, error } = useQuery(GET_BUDGET_GOAL, {
        variables: { month },
        fetchPolicy: 'cache-first',
    });

    const [setBudgetGoal, {loading: setting}] = useMutation(SET_BUDGET_GOAL, {
        refetchQueries: [GET_BUDGET_GOAL],
    });

    return {
        budgetGoal: data?.budgetGoal,
        loading,
        error,
        setBudgetGoal,
        setting,
    };
}