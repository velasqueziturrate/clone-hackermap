import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ChangeDetectionStrategy} from "@angular/core";
import {NavigationComponent} from "./navigation/navigation.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled;

  const getByTestId = (id, parentNode?) => {
    if (!parentNode) {
      parentNode = compiled;
    }
    return parentNode.querySelector(`[data-test-id="${id}"]`);
  };

  const getWithin = (dataTestId, parentDataTestId) => {
    const parent = getByTestId(parentDataTestId);
    return getByTestId(dataTestId, parent);
  };

  const click = async (button: HTMLElement) => {
    button.click();
    fixture.detectChanges();
    await fixture.whenStable();
  }

  const locations = [
    'Lombard St, San Francisco, CA, USA',
    'PIER 39, The Embarcadero, San Francisco, CA, USA',
    'Golden Gate Bridge, San Francisco, CA, USA',
    `Fisherman's Wharf, San Francisco, CA, USA`,
    'Alcatraz Island, San Francisco, CA, USA'
  ];

  const IDMAPS = {
    UP_BUTTON: 'up-button',
    DOWN_BUTTON: 'down-button',
    LOCATION: 'location',
    LOCATION_LIST_PARENT: 'location-list',
    LOCATIONS: ['location-0', 'location-1', 'location-2', 'location-3', 'location-4']
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationComponent
      ],
      imports: [],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideComponent(AppComponent, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('Should render all the locations in the list', () => {
    const listContainer = getByTestId(IDMAPS.LOCATION_LIST_PARENT);
    expect(listContainer.children.length).toEqual(5);
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[0]).innerHTML.trim()).toEqual(locations[0].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[1]).innerHTML.trim()).toEqual(locations[1].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[2]).innerHTML.trim()).toEqual(locations[2].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[3]).innerHTML.trim()).toEqual(locations[3].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[4]).innerHTML.trim()).toEqual(locations[4].trim());
  });

  it('Should have correct buttons for each location', () => {
    expect(getWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[0])).toBeFalsy();
    expect(getWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[0])).toBeTruthy();

    expect(getWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[1])).toBeTruthy();
    expect(getWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[1])).toBeTruthy();

    expect(getWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[2])).toBeTruthy();
    expect(getWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[2])).toBeTruthy();

    expect(getWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[3])).toBeTruthy();
    expect(getWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[3])).toBeTruthy();

    expect(getWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[4])).toBeTruthy();
    expect(getWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[4])).toBeFalsy();
  });

  it('Should move the location down on clicking the down button', async () => {
    await click(getWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[1]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[2]).innerHTML.trim()).toEqual(locations[1].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[1]).innerHTML.trim()).toEqual(locations[2].trim());

    await click(getWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[2]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[3]).innerHTML.trim()).toEqual(locations[1].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[2]).innerHTML.trim()).toEqual(locations[3].trim());

    await click(getWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[3]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[4]).innerHTML.trim()).toEqual(locations[1].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[3]).innerHTML.trim()).toEqual(locations[4].trim());
  });

  it('Should move the location up on clicking the up button', async () => {
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[4]).innerHTML.trim()).toEqual(locations[4].trim());
    await click(getWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[4]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[3]).innerHTML.trim()).toEqual(locations[4].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[4]).innerHTML.trim()).toEqual(locations[3].trim());

    await click(getWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[3]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[2]).innerHTML.trim()).toEqual(locations[4].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[3]).innerHTML.trim()).toEqual(locations[2].trim());

    await click(getWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[2]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[1]).innerHTML.trim()).toEqual(locations[4].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[2]).innerHTML.trim()).toEqual(locations[1].trim());

    await click(getWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[1]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[0]).innerHTML.trim()).toEqual(locations[4].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[1]).innerHTML.trim()).toEqual(locations[0].trim());
  });


  it('Should be in correct state after a series of actions', async () => {
    await click(getWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[0]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[1]).innerHTML.trim()).toEqual(locations[0].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[0]).innerHTML.trim()).toEqual(locations[1].trim());

    await click(getWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[2]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[2]).innerHTML.trim()).toEqual(locations[0].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[1]).innerHTML.trim()).toEqual(locations[2].trim());

    await click(getWithin(IDMAPS.UP_BUTTON, IDMAPS.LOCATIONS[4]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[3]).innerHTML.trim()).toEqual(locations[4].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[4]).innerHTML.trim()).toEqual(locations[3].trim());

    await click(getWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[2]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[3]).innerHTML.trim()).toEqual(locations[0].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[2]).innerHTML.trim()).toEqual(locations[4].trim());

    await click(getWithin(IDMAPS.DOWN_BUTTON, IDMAPS.LOCATIONS[1]));
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[2]).innerHTML.trim()).toEqual(locations[2].trim());
    expect(getWithin(IDMAPS.LOCATION, IDMAPS.LOCATIONS[1]).innerHTML.trim()).toEqual(locations[4].trim());

  })
});
