module('Item');

test('copyTo(document)', function() {
	var doc = new Doc();
	var path = new Path();
	var secondDoc = new Doc();
	var copy = path.copyTo(secondDoc);
	equals(secondDoc.activeLayer.children.indexOf(copy) != -1, true);
	equals(doc.activeLayer.children.indexOf(copy) == -1, true);
	equals(copy != path, true);
});

test('copyTo(layer)', function() {
	var doc = new Doc();
	var path = new Path();

	var layer = new Layer();
	var copy = path.copyTo(layer);
	equals(layer.children.indexOf(copy) != -1, true);
	equals(doc.layers[0].children.indexOf(copy) == -1, true);
});

test('clone()', function() {
	var doc = new Doc();
	var path = new Path();
	var copy = path.clone();
	equals(doc.activeLayer.children.length == 2, true);
	equals(path != copy, true);
});

test('appendChild(item)', function() {
	var doc = new Doc();
	var path = new Path();
	doc.activeLayer.appendChild(path);
	equals(doc.activeLayer.children.length, 1);
});

test('item.parent / item.isChild', function() {
	var doc = new Doc();
	var secondDoc = new Doc();
	var path = new Path();
	doc.activeLayer.appendChild(path);
	equals(doc.activeLayer.children.indexOf(path) != -1, true);
	secondDoc.activeLayer.appendTop(path);
	equals(doc.activeLayer.isChild(path), false);
	equals(secondDoc.activeLayer.isChild(path), true);
	equals(doc.activeLayer.children.indexOf(path) == -1, true);
	equals(secondDoc.activeLayer.children.indexOf(path) == 0, true);
});

test('item.lastChild / item.firstChild', function() {
	var doc = new Doc();
	var path = new Path();
	var secondPath = new Path();
	equals(doc.activeLayer.firstChild == path, true);
	equals(doc.activeLayer.lastChild == secondPath, true);
});

test('appendBottom(item)', function() {
	var doc = new Doc();
	var path = new Path();
	var secondPath = new Path();
	doc.activeLayer.appendBottom(secondPath);
	equals(secondPath.index < path.index, true);
});

test('moveAbove(item)', function() {
	var doc = new Doc();
	var path = new Path();
	var secondPath = new Path();
	path.moveAbove(secondPath);
	equals(doc.activeLayer.lastChild == path, true);
});

test('moveBelow(item)', function() {
	var doc = new Doc();
	var firstPath = new Path();
	var secondPath = new Path();
	equals(secondPath.index > firstPath.index, true);
	secondPath.moveBelow(firstPath);
	equals(secondPath.index < firstPath.index, true);
});

test('isDescendant(item) / isAncestor(item)', function() {
	var doc = new Doc();
	var path = new Path();
	equals(path.isDescendant(doc.activeLayer), true);
	equals(doc.activeLayer.isDescendant(path), false);

	equals(path.isAncestor(doc.activeLayer), false);
	equals(doc.activeLayer.isAncestor(path), true);
	
	// an item can't be its own descendant:
	equals(doc.activeLayer.isDescendant(doc.activeLayer), false);

	// an item can't be its own ancestor:
	equals(doc.activeLayer.isAncestor(doc.activeLayer), false);
});

test('isGroupedWith', function() {
	var doc = new Doc();
	var path = new Path();
	var secondPath = new Path();
	var group = new Group([path]);
	var secondGroup = new Group([secondPath]);
	
	equals(path.isGroupedWith(secondPath), false);
	secondGroup.appendTop(path);
	equals(path.isGroupedWith(secondPath), true);
	equals(path.isGroupedWith(group), false);
	equals(path.isDescendant(secondGroup), true);
	equals(secondGroup.isDescendant(path), false);
	equals(secondGroup.isDescendant(secondGroup), false);
	equals(path.isGroupedWith(secondGroup), false);
	Paper.document.activeLayer.appendTop(path);
	equals(path.isGroupedWith(secondPath), false);
	Paper.document.activeLayer.appendTop(secondPath);
	equals(path.isGroupedWith(secondPath), false);
});

test('getPreviousSibling() / getNextSibling()', function() {
	var doc = new Doc();
	var firstPath = new Path();
	var secondPath = new Path();
	equals(firstPath.nextSibling == secondPath, true);
	equals(secondPath.previousSibling == firstPath, true);
	equals(secondPath.nextSibling == null, true);
});

test('hidden', function() {
	var doc = new Doc();
	var firstPath = new Path();
	firstPath.visible = false;
	equals(firstPath.hidden, true);
});

test('reverseChildren()', function() {
	var doc = new Doc();
	var path = new Path();
	var secondPath = new Path();
	var thirdPath = new Path();
	equals(doc.activeLayer.firstChild == path, true);
	doc.activeLayer.reverseChildren();
	equals(doc.activeLayer.firstChild == path, false);
	equals(doc.activeLayer.firstChild == thirdPath, true);
	equals(doc.activeLayer.lastChild == path, true);
})