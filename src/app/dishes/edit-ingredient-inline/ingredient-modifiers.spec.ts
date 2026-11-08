import {EditIngredientInlineComponent} from './edit-ingredient-inline.component';
import {Ingredient} from '../../model/Ingredient';
import {TokenType} from './token';
import {TextAndSelection} from '../ingredient-input/text-and-selection';

describe('Ingredient modifier parsing', () => {
  it('preserves unit-size and marker modifiers when emitting an ingredient', () => {
    // Exercise token assembly directly; these collaborators are not used by it.
    const component = new EditIngredientInlineComponent(null, null, null);
    component._ingredient = new Ingredient();
    component.tokenList.listOfTokens = [
      {type: TokenType.WholeNumber, text: '2', matchingText: ' 2 ', id: ''},
      {type: TokenType.UnitSize, text: 'large', matchingText: ' large ', id: ''},
      {type: TokenType.Marker, text: 'chopped', matchingText: ' chopped ', id: ''}
    ];
    let emitted: Ingredient;
    component.editedIngredient.subscribe(ingredient => emitted = ingredient);
    // passChangesOn is the token-assembly boundary, independent of API suggestions.
    (component as any).passChangesOn(new TextAndSelection('2 large chopped', ''));
    expect(emitted.amount.whole_quantity).toBe(2);
    expect(emitted.raw_modifiers).toEqual(['large', 'chopped']);
    expect(component.ingredientErrors).toEqual([]);
    component.ngOnDestroy();
  });
});
